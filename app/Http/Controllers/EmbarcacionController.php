<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Embarcacion;
use App\Models\DocumentacionEmbarcacion;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterNotification;
use Response;
use File;
use App\Models\Rol;
use Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class EmbarcacionController extends Controller
{
    public static $servicios = [
        "Nado con el Tiburón Ballena (1 de octubre a 30 abril)",
        "Paseo de día y 'snorkel' a la Isla Espirítu Santo",
        "Paseo de día y 'snorkel' a Balandra",
        "Pesca deportiva",
    ];
    
    public function index()
    {
        return view('dashboard_admin.pages.embarcaciones');
    }

    public function indexAdmin()
    {
        $user_rol = Auth::user()->rol_id;
        $rol = Rol::where('id', $user_rol)->first();
        $department_id = Auth::user()->department_id;

        if ( ($rol->name === 'Super Admin') || ($rol->name === 'Presidente') ) {
            return view('dashboard_admin.pages.embarcaciones');
        }
        
        abort(403);
    }
    
    public function registroEmbarcacion(Request $request)
    {
        // Validación de los datos de entrada
        $validator = Validator::make($request->all(), [
            'numero_embarcacion' => 'required|unique:embarcaciones',
            'nombre_embarcacion' => 'required',
            'numero_permiso_nautico' => 'required|unique:embarcaciones',
            'nombre_permisionario' => 'required',
            'nombre_representante' => 'nullable',
            'capacidad_pasajeros' => 'required|integer|min:1',
            'turno_salida' => 'required',
            'hora_salida' => 'required',
            'telefono_contacto' => 'required',
            'email_contacto' => 'required|email',
            'servicio_ofrecido' => 'required',
            'vigencia_certificado_seguridad' => 'required|date',
            'numero_poliza_seguro' => 'required',
            'telefono_siniestros' => 'required',
            'foto_embarcacion' => 'required|file|mimes:jpeg,png,jpg|max:2048',
            'carrusel' => 'required|in:A,B',
            
            // Documentación
            'permiso_turismo_nautico' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_pesca_deportiva' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_balandra_conanp' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_espiritu_santo_conanp' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_tiburon_ballena_dgvs' => 'nullable|file|mimes:pdf|max:2048',
            'registro_nacional_turismo' => 'nullable|file|mimes:pdf|max:2048',
            'registro_nacional_embarcaciones' => 'nullable|file|mimes:pdf|max:2048',
            'constancia_residencia_acta_nacimiento' => 'nullable|file|mimes:pdf|max:2048',
            'carta_verdad_propia_oficina' => 'nullable|file|mimes:pdf|max:2048',
            'carta_verdad_trabajado_zona_malecon' => 'nullable|file|mimes:pdf|max:2048',
            'carta_no_concesion_playa_zofemat' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_uso_muelle_fiscal_api' => 'nullable|file|mimes:pdf|max:2048'
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        try {
            // Crear registro en la base de datos primero (sin archivos)
            $embarcacionData = $request->except(array_merge(['foto_embarcacion'], $this->getDocumentFields()));
            $embarcacion = Embarcacion::create($embarcacionData);
            
            // Procesar archivos
            $this->procesarArchivos($request, $embarcacion);
            
            return response()->json([
                'message' => 'Embarcación registrada exitosamente!',
                'embarcacion' => $embarcacion->load('documentacion')
            ], 201);

        } catch (\Exception $e) {
            // En caso de error, eliminar la embarcación creada si existe
            if (isset($embarcacion)) {
                $embarcacion->delete();
            }
            
            return response()->json([
                'message' => 'Error al registrar la embarcación',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Métodos auxiliares para manejo de archivos
    private function crearEstructuraCarpetas()
    {
        $carpetasBase = ['embarcaciones', 'embarcaciones/carrusel_A', 'embarcaciones/carrusel_B'];
        
        foreach ($carpetasBase as $carpeta) {
            if (!Storage::disk('public')->exists($carpeta)) {
                Storage::disk('public')->makeDirectory($carpeta);
            }
        }
    }

    private function getDocumentFields()
    {
        return [
            'permiso_turismo_nautico',
            'permiso_pesca_deportiva',
            'permiso_balandra_conanp',
            'permiso_espiritu_santo_conanp',
            'permiso_tiburon_ballena_dgvs',
            'registro_nacional_turismo',
            'registro_nacional_embarcaciones',
            'constancia_residencia_acta_nacimiento',
            'carta_verdad_propia_oficina',
            'carta_verdad_trabajado_zona_malecon',
            'carta_no_concesion_playa_zofemat',
            'permiso_uso_muelle_fiscal_api'
        ];
    }

    private function procesarArchivos(Request $request, Embarcacion $embarcacion)
    {
        $carpetaCarrusel = $embarcacion->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
        $carpetaEmbarcacion = 'embarcacion_' . $embarcacion->id;
        $rutaBase = "embarcaciones/{$carpetaCarrusel}/{$carpetaEmbarcacion}";
        
        // Crear estructura de carpetas si no existe
        if (!Storage::disk('public')->exists($rutaBase)) {
            Storage::disk('public')->makeDirectory($rutaBase);
            Storage::disk('public')->makeDirectory("{$rutaBase}/documentos");
        }

        // Procesar foto principal
        if ($request->hasFile('foto_embarcacion')) {
            $this->guardarArchivo($request->file('foto_embarcacion'), $rutaBase, 'foto_embarcacion', $embarcacion);
        }

        // Procesar documentos
        $documentosData = ['embarcacion_id' => $embarcacion->id];
        foreach ($this->getDocumentFields() as $field) {
            if ($request->hasFile($field)) {
                $path = $this->guardarArchivo($request->file($field), "{$rutaBase}/documentos", $field);
                $documentosData[$field] = Storage::url($path);
            }
        }

        // Crear registro de documentación
        DocumentacionEmbarcacion::create($documentosData);
    }

    private function guardarArchivo($archivo, $ruta, $nombreBase, $model = null)
    {
        // Generar nombre único para el archivo
        $nombreArchivo = $nombreBase . '_' . Str::random(10) . '.' . $archivo->extension();
        
        // Guardar el archivo en el almacenamiento público
        $path = $archivo->storeAs($ruta, $nombreArchivo, 'public');
        
        // Actualizar modelo si es necesario (para la foto principal)
        if ($model && $nombreBase === 'foto_embarcacion') {
            $model->update(['foto_embarcacion' => Storage::url($path)]);
        }
        
        return $path;
    }
    
    public function all()
    {
        return Embarcacion::all();
    }

    public function getDataAll()
    {
        try {
            $embarcaciones = Embarcacion::with('documentacion')->get();
            return response()->json($embarcaciones);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener las embarcaciones'
            ], 500);
        }
    }

    public function find($id)
    {
        $embarcacion = Embarcacion::with('documentacion')->find($id);
        
        if (!$embarcacion) {
            return response()->json(['message' => 'Embarcación no encontrada'], 404);
        }

        return response()->json([
            'embarcacion' => $embarcacion
        ]);
    }
    
    public function obtenerCSVRegistrados()
    {
        $embarcaciones = Embarcacion::with('documentacion')->orderBy('created_at')->get();
        
        $filename = "embarcaciones-registradas-" . date('Y-m-d') . ".csv";
        $filepath = storage_path("app/public/{$filename}");
        
        $handle = fopen($filepath, 'w');
        
        // Encabezados
        fputcsv($handle, [
            'ID', 'Número Embarcación', 'Nombre Embarcación', 'Permiso Náutico', 'Permisionario',
            'Representante', 'Capacidad', 'Turno', 'Hora Salida', 'Teléfono Contacto', 'Email Contacto',
            'Servicio', 'Vigencia Certificado', 'Póliza Seguro', 'Teléfono Siniestros', 'Carrusel',
            'Foto Embarcación', 'Fecha Registro',
            // Documentación
            'Permiso Turismo Náutico', 'Permiso Pesca Deportiva', 'Permiso Balandra CONANP',
            'Permiso Espíritu Santo CONANP', 'Permiso Tiburón Ballena DGVS',
            'Registro Nacional Turismo', 'Registro Nacional Embarcaciones',
            'Constancia Residencia/Acta Nacimiento', 'Carta Verdad Propia Oficina',
            'Carta Verdad Trabajado Zona Malecón', 'Carta No Concesión Playa ZOFEMAT',
            'Permiso Uso Muelle Fiscal API'
        ]);
        
        // Datos
        foreach ($embarcaciones as $embarcacion) {
            $doc = $embarcacion->documentacion;
            
            fputcsv($handle, [
                $embarcacion->id,
                $embarcacion->numero_embarcacion,
                $embarcacion->nombre_embarcacion,
                $embarcacion->numero_permiso_nautico,
                $embarcacion->nombre_permisionario,
                $embarcacion->nombre_representante,
                $embarcacion->capacidad_pasajeros,
                $embarcacion->turno_salida,
                $embarcacion->hora_salida,
                $embarcacion->telefono_contacto,
                $embarcacion->email_contacto,
                $embarcacion->servicio_ofrecido,
                $embarcacion->vigencia_certificado_seguridad,
                $embarcacion->numero_poliza_seguro,
                $embarcacion->telefono_siniestros,
                $embarcacion->carrusel,
                $embarcacion->foto_embarcacion,
                $embarcacion->created_at,
                // Documentación
                $doc->permiso_turismo_nautico ?? 'No subido',
                $doc->permiso_pesca_deportiva ?? 'No subido',
                $doc->permiso_balandra_conanp ?? 'No subido',
                $doc->permiso_espiritu_santo_conanp ?? 'No subido',
                $doc->permiso_tiburon_ballena_dgvs ?? 'No subido',
                $doc->registro_nacional_turismo ?? 'No subido',
                $doc->registro_nacional_embarcaciones ?? 'No subido',
                $doc->constancia_residencia_acta_nacimiento ?? 'No subido',
                $doc->carta_verdad_propia_oficina ?? 'No subido',
                $doc->carta_verdad_trabajado_zona_malecon ?? 'No subido',
                $doc->carta_no_concesion_playa_zofemat ?? 'No subido',
                $doc->permiso_uso_muelle_fiscal_api ?? 'No subido'
            ]);
        }
        
        fclose($handle);
        
        return response()->download($filepath, $filename, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
        ])->deleteFileAfterSend(true);
    }

    public function createXLS()
    {
        $embarcaciones = Embarcacion::with('documentacion')->get();

        if ($embarcaciones->isEmpty()) {
            return response()->json([
                'result' => false,
                'message' => 'No hay embarcaciones para exportar'
            ], 404);
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Configurar estilos
        $headerStyle = [
            'font' => ['bold' => true],
            'alignment' => ['horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER],
            'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => 'DDDDDD']]
        ];

        // Encabezados principales
        $headers = [
            'A' => 'ID',
            'B' => 'Número Embarcación',
            'C' => 'Nombre Embarcación',
            'D' => 'Permiso Náutico',
            'E' => 'Permisionario',
            'F' => 'Representante',
            'G' => 'Capacidad',
            'H' => 'Turno',
            'I' => 'Hora Salida',
            'J' => 'Teléfono Contacto',
            'K' => 'Email Contacto',
            'L' => 'Servicio',
            'M' => 'Vigencia Certificado',
            'N' => 'Póliza Seguro',
            'O' => 'Teléfono Siniestros',
            'P' => 'Carrusel',
            'Q' => 'Foto Embarcación',
            'R' => 'Fecha Registro'
        ];

        // Encabezados de documentación
        $docHeaders = [
            'S' => 'Permiso Turismo Náutico',
            'T' => 'Permiso Pesca Deportiva',
            'U' => 'Permiso Balandra CONANP',
            'V' => 'Permiso Espíritu Santo CONANP',
            'W' => 'Permiso Tiburón Ballena DGVS',
            'X' => 'Registro Nacional Turismo',
            'Y' => 'Registro Nacional Embarcaciones',
            'Z' => 'Constancia Residencia/Acta Nacimiento',
            'AA' => 'Carta Verdad Propia Oficina',
            'AB' => 'Carta Verdad Trabajado Zona Malecón',
            'AC' => 'Carta No Concesión Playa ZOFEMAT',
            'AD' => 'Permiso Uso Muelle Fiscal API'
        ];

        // Combinar todos los encabezados
        $allHeaders = array_merge($headers, $docHeaders);

        foreach ($allHeaders as $col => $header) {
            $sheet->setCellValue($col.'1', $header)->getStyle($col.'1')->applyFromArray($headerStyle);
        }

        // Llenar datos
        foreach ($embarcaciones as $row => $embarcacion) {
            $doc = $embarcacion->documentacion;
            $dataRow = $row + 2;

            // Datos principales
            $sheet->setCellValue('A'.$dataRow, $embarcacion->id);
            $sheet->setCellValue('B'.$dataRow, $embarcacion->numero_embarcacion);
            $sheet->setCellValue('C'.$dataRow, $embarcacion->nombre_embarcacion);
            $sheet->setCellValue('D'.$dataRow, $embarcacion->numero_permiso_nautico);
            $sheet->setCellValue('E'.$dataRow, $embarcacion->nombre_permisionario);
            $sheet->setCellValue('F'.$dataRow, $embarcacion->nombre_representante ?? 'N/A');
            $sheet->setCellValue('G'.$dataRow, $embarcacion->capacidad_pasajeros);
            $sheet->setCellValue('H'.$dataRow, $embarcacion->turno_salida);
            $sheet->setCellValue('I'.$dataRow, $embarcacion->hora_salida);
            $sheet->setCellValue('J'.$dataRow, $embarcacion->telefono_contacto);
            $sheet->setCellValue('K'.$dataRow, $embarcacion->email_contacto);
            $sheet->setCellValue('L'.$dataRow, $embarcacion->servicio_ofrecido);
            $sheet->setCellValue('M'.$dataRow, $embarcacion->vigencia_certificado_seguridad);
            $sheet->setCellValue('N'.$dataRow, $embarcacion->numero_poliza_seguro);
            $sheet->setCellValue('O'.$dataRow, $embarcacion->telefono_siniestros);
            $sheet->setCellValue('P'.$dataRow, $embarcacion->carrusel);
            $sheet->setCellValue('Q'.$dataRow, $embarcacion->foto_embarcacion ? 'Subida' : 'No subida');
            $sheet->setCellValue('R'.$dataRow, $embarcacion->created_at);

            // Datos de documentación
            $sheet->setCellValue('S'.$dataRow, $doc->permiso_turismo_nautico ? 'Subido' : 'No subido');
            $sheet->setCellValue('T'.$dataRow, $doc->permiso_pesca_deportiva ? 'Subido' : 'No subido');
            $sheet->setCellValue('U'.$dataRow, $doc->permiso_balandra_conanp ? 'Subido' : 'No subido');
            $sheet->setCellValue('V'.$dataRow, $doc->permiso_espiritu_santo_conanp ? 'Subido' : 'No subido');
            $sheet->setCellValue('W'.$dataRow, $doc->permiso_tiburon_ballena_dgvs ? 'Subido' : 'No subido');
            $sheet->setCellValue('X'.$dataRow, $doc->registro_nacional_turismo ? 'Subido' : 'No subido');
            $sheet->setCellValue('Y'.$dataRow, $doc->registro_nacional_embarcaciones ? 'Subido' : 'No subido');
            $sheet->setCellValue('Z'.$dataRow, $doc->constancia_residencia_acta_nacimiento ? 'Subido' : 'No subido');
            $sheet->setCellValue('AA'.$dataRow, $doc->carta_verdad_propia_oficina ? 'Subido' : 'No subido');
            $sheet->setCellValue('AB'.$dataRow, $doc->carta_verdad_trabajado_zona_malecon ? 'Subido' : 'No subido');
            $sheet->setCellValue('AC'.$dataRow, $doc->carta_no_concesion_playa_zofemat ? 'Subido' : 'No subido');
            $sheet->setCellValue('AD'.$dataRow, $doc->permiso_uso_muelle_fiscal_api ? 'Subido' : 'No subido');
        }

        // Autoajustar columnas
        foreach (array_keys($allHeaders) as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);

        $filename = 'embarcaciones-registradas-'.now()->format('Y-m-d_H-i').'.xlsx';

        return response()->streamDownload(
            function () use ($writer) {
                $writer->save('php://output');
            },
            $filename,
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        );
    }
    
    public function update(Request $request, $id)
    {
        $embarcacion = Embarcacion::with('documentacion')->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'numero_embarcacion' => 'required|unique:embarcaciones,numero_embarcacion,'.$id,
            'nombre_embarcacion' => 'required',
            'numero_permiso_nautico' => 'required|unique:embarcaciones,numero_permiso_nautico,'.$id,
            'nombre_permisionario' => 'required',
            'nombre_representante' => 'nullable',
            'capacidad_pasajeros' => 'required|integer|min:1',
            'turno_salida' => 'required',
            'hora_salida' => 'required',
            'telefono_contacto' => 'required',
            'email_contacto' => 'required|email',
            'servicio_ofrecido' => 'required',
            'vigencia_certificado_seguridad' => 'required|date',
            'numero_poliza_seguro' => 'required',
            'telefono_siniestros' => 'required',
            'carrusel' => 'required|in:A,B',
            'foto_embarcacion' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
            
            // Documentación
            'permiso_turismo_nautico' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_pesca_deportiva' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_balandra_conanp' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_espiritu_santo_conanp' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_tiburon_ballena_dgvs' => 'nullable|file|mimes:pdf|max:2048',
            'registro_nacional_turismo' => 'nullable|file|mimes:pdf|max:2048',
            'registro_nacional_embarcaciones' => 'nullable|file|mimes:pdf|max:2048',
            'constancia_residencia_acta_nacimiento' => 'nullable|file|mimes:pdf|max:2048',
            'carta_verdad_propia_oficina' => 'nullable|file|mimes:pdf|max:2048',
            'carta_verdad_trabajado_zona_malecon' => 'nullable|file|mimes:pdf|max:2048',
            'carta_no_concesion_playa_zofemat' => 'nullable|file|mimes:pdf|max:2048',
            'permiso_uso_muelle_fiscal_api' => 'nullable|file|mimes:pdf|max:2048'
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        try {
            // Actualizar datos básicos
            $embarcacion->update($request->only([
                'numero_embarcacion',
                'nombre_embarcacion',
                'numero_permiso_nautico',
                'nombre_permisionario',
                'nombre_representante',
                'capacidad_pasajeros',
                'turno_salida',
                'hora_salida',
                'telefono_contacto',
                'email_contacto',
                'servicio_ofrecido',
                'vigencia_certificado_seguridad',
                'numero_poliza_seguro',
                'telefono_siniestros',
                'carrusel'
            ]));

            // Procesar archivos
            $this->procesarArchivosParaActualizacion($request, $embarcacion);
            
            return response()->json([
                'message' => 'Embarcación actualizada exitosamente!',
                'embarcacion' => $embarcacion->load('documentacion')
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar la embarcación',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function procesarArchivosParaActualizacion(Request $request, Embarcacion $embarcacion)
    {
        $carpetaCarrusel = $embarcacion->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
        $carpetaEmbarcacion = 'embarcacion_' . $embarcacion->id;
        $rutaBase = "embarcaciones/{$carpetaCarrusel}/{$carpetaEmbarcacion}";
        
        // Procesar foto principal si se proporciona
        if ($request->hasFile('foto_embarcacion')) {
            // Eliminar foto anterior si existe
            if ($embarcacion->foto_embarcacion) {
                $oldPath = str_replace('/storage', '', $embarcacion->foto_embarcacion);
                Storage::disk('public')->delete($oldPath);
            }

            $foto = $request->file('foto_embarcacion');
            $path = $foto->storeAs(
                $rutaBase, 
                'foto_embarcacion_' . Str::random(10) . '.' . $foto->extension(), 
                'public'
            );
            $embarcacion->foto_embarcacion = Storage::url($path);
            $embarcacion->save();
        }

        // Procesar documentos
        $documentosData = [];
        foreach ($this->getDocumentFields() as $field) {
            if ($request->hasFile($field)) {
                // Eliminar documento anterior si existe
                if ($embarcacion->documentacion && $embarcacion->documentacion->$field) {
                    $oldDocPath = str_replace('/storage', '', $embarcacion->documentacion->$field);
                    Storage::disk('public')->delete($oldDocPath);
                }

                $documento = $request->file($field);
                $path = $documento->storeAs(
                    "{$rutaBase}/documentos", 
                    $field . '_' . Str::random(10) . '.' . $documento->extension(), 
                    'public'
                );
                $documentosData[$field] = Storage::url($path);
            }
        }

        // Actualizar documentación
        if ($embarcacion->documentacion && !empty($documentosData)) {
            $embarcacion->documentacion->update($documentosData);
        } elseif (!empty($documentosData)) {
            $documentosData['embarcacion_id'] = $embarcacion->id;
            DocumentacionEmbarcacion::create($documentosData);
        }
    }

    public function destroy($id)
    {
        $embarcacion = Embarcacion::with('documentacion')->findOrFail($id);
        
        try {
            // Eliminar archivos de almacenamiento
            if ($embarcacion->foto_embarcacion) {
                $fotoPath = str_replace('/storage', '', $embarcacion->foto_embarcacion);
                Storage::disk('public')->delete($fotoPath);
            }

            // Eliminar documentos si existen
            if ($embarcacion->documentacion) {
                $documentFields = $this->getDocumentFields();

                foreach ($documentFields as $field) {
                    if ($embarcacion->documentacion->$field) {
                        $docPath = str_replace('/storage', '', $embarcacion->documentacion->$field);
                        Storage::disk('public')->delete($docPath);
                    }
                }

                // Eliminar carpeta de documentos
                $carpetaCarrusel = $embarcacion->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
                $nombreCarpeta = 'embarcacion_' . $embarcacion->id;
                $documentosPath = "embarcaciones/{$carpetaCarrusel}/{$nombreCarpeta}/documentos";
                if (Storage::disk('public')->exists($documentosPath)) {
                    Storage::disk('public')->deleteDirectory($documentosPath);
                }

                // Eliminar carpeta principal
                $carpetaPrincipal = "embarcaciones/{$carpetaCarrusel}/{$nombreCarpeta}";
                if (Storage::disk('public')->exists($carpetaPrincipal)) {
                    Storage::disk('public')->deleteDirectory($carpetaPrincipal);
                }

                $embarcacion->documentacion->delete();
            }

            // Eliminar la embarcación
            $embarcacion->delete();

            return response()->json([
                'message' => 'Embarcación eliminada exitosamente!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar la embarcación',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}