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
        // Crear carpetas base si no existen
        if (!Storage::disk('public')->exists('embarcaciones')) {
            Storage::disk('public')->makeDirectory('embarcaciones');
        }
        if (!Storage::disk('public')->exists('embarcaciones/carrusel_A')) {
            Storage::disk('public')->makeDirectory('embarcaciones/carrusel_A');
        }
        if (!Storage::disk('public')->exists('embarcaciones/carrusel_B')) {
            Storage::disk('public')->makeDirectory('embarcaciones/carrusel_B');
        }

        // Crear registro en la base de datos
        $embarcacion = Embarcacion::create([
            'numero_embarcacion' => $request->numero_embarcacion,
            'nombre_embarcacion' => $request->nombre_embarcacion,
            'numero_permiso_nautico' => $request->numero_permiso_nautico,
            'nombre_permisionario' => $request->nombre_permisionario,
            'nombre_representante' => $request->nombre_representante,
            'capacidad_pasajeros' => $request->capacidad_pasajeros,
            'turno_salida' => $request->turno_salida,
            'hora_salida' => $request->hora_salida,
            'telefono_contacto' => $request->telefono_contacto,
            'email_contacto' => $request->email_contacto,
            'servicio_ofrecido' => $request->servicio_ofrecido,
            'vigencia_certificado_seguridad' => $request->vigencia_certificado_seguridad,
            'numero_poliza_seguro' => $request->numero_poliza_seguro,
            'telefono_siniestros' => $request->telefono_siniestros,
            'carrusel' => $request->carrusel,
            'foto_embarcacion' => null
        ]);

        // Configurar rutas de almacenamiento
        $carpetaCarrusel = $request->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
        $carpetaEmbarcacion = 'embarcacion_' . $embarcacion->id;
        $rutaBase = "embarcaciones/{$carpetaCarrusel}/{$carpetaEmbarcacion}";
        
        // Crear carpetas para la embarcación
        Storage::disk('public')->makeDirectory($rutaBase);
        Storage::disk('public')->makeDirectory("{$rutaBase}/documentos");

        // Procesar foto de la embarcación
        if ($request->hasFile('foto_embarcacion')) {
            $foto = $request->file('foto_embarcacion');
            $extension = $foto->extension();
            $nombreArchivo = 'foto_embarcacion.' . $extension;
            
            $path = $foto->storeAs(
                $rutaBase, 
                $nombreArchivo, 
                'public'
            );
            
            $embarcacion->update(['foto_embarcacion' => Storage::url($path)]);
        }

        // Procesar documentos
        $documentosData = ['embarcacion_id' => $embarcacion->id];
        $documentFields = [
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

        foreach ($documentFields as $field) {
            if ($request->hasFile($field)) {
                $documento = $request->file($field);
                $extension = $documento->extension();
                $nombreArchivo = $field . '.' . $extension;
                
                $path = $documento->storeAs(
                    "{$rutaBase}/documentos", 
                    $nombreArchivo, 
                    'public'
                );
                
                $documentosData[$field] = Storage::url($path);
            }
        }

        // Crear registro de documentación
        DocumentacionEmbarcacion::create($documentosData);
        
        // Enviar notificación por correo
        try {
            Mail::to($embarcacion->email_contacto)->send(new RegisterNotification([
                'id' => $embarcacion->id
            ]));
        } catch (\Exception $mailException) {
            \Log::error('Error al enviar correo: ' . $mailException->getMessage());
        }
        
        return response()->json([
            'message' => 'Embarcación registrada exitosamente!',
            'embarcacion' => $embarcacion->load('documentacion'),
            'ruta_archivos' => $rutaBase
        ], 201);

    } catch (\Exception $e) {
        // En caso de error, eliminar lo creado para mantener consistencia
        if (isset($embarcacion)) {
            try {
                if (isset($rutaBase) && Storage::disk('public')->exists($rutaBase)) {
                    Storage::disk('public')->deleteDirectory($rutaBase);
                }
                $embarcacion->delete();
            } catch (\Exception $cleanupException) {
                \Log::error('Error en limpieza: ' . $cleanupException->getMessage());
            }
        }
        
        \Log::error('Error en registroEmbarcacion: ' . $e->getMessage());
        
        return response()->json([
            'message' => 'Error al registrar la embarcación',
            'error' => $e->getMessage(),
            'trace' => env('APP_DEBUG') ? $e->getTraceAsString() : null
        ], 500);
    }
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
            'embarcacion' => [
                'id' => $embarcacion->id,
                'numero_embarcacion' => $embarcacion->numero_embarcacion,
                'nombre_embarcacion' => $embarcacion->nombre_embarcacion,
                // ... todos los campos principales
                'documentacion' => $embarcacion->documentacion
            ]
        ]);
    }
    
    public function obtenerCSVRegistrados()
    {
        $embarcaciones = Embarcacion::with('documentacion')->orderBy('created_at')->get();
        
        $filename = "embarcaciones-registradas.csv";
        $filepath = public_path("files/" . $filename);
        
        if (!File::exists(public_path("files"))) {
            File::makeDirectory(public_path("files"));
        }
        
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
                $embarcacion->hora_salida->format('H:i'),
                $embarcacion->telefono_contacto,
                $embarcacion->email_contacto,
                $embarcacion->servicio_ofrecido,
                $embarcacion->vigencia_certificado_seguridad->format('Y-m-d'),
                $embarcacion->numero_poliza_seguro,
                $embarcacion->telefono_siniestros,
                $embarcacion->carrusel,
                $embarcacion->foto_embarcacion,
                $embarcacion->created_at->format('Y-m-d H:i:s'),
                // Documentación
                $doc->permiso_turismo_nautico ?? '',
                $doc->permiso_pesca_deportiva ?? '',
                $doc->permiso_balandra_conanp ?? '',
                $doc->permiso_espiritu_santo_conanp ?? '',
                $doc->permiso_tiburon_ballena_dgvs ?? '',
                $doc->registro_nacional_turismo ?? '',
                $doc->registro_nacional_embarcaciones ?? '',
                $doc->constancia_residencia_acta_nacimiento ?? '',
                $doc->carta_verdad_propia_oficina ?? '',
                $doc->carta_verdad_trabajado_zona_malecon ?? '',
                $doc->carta_no_concesion_playa_zofemat ?? '',
                $doc->permiso_uso_muelle_fiscal_api ?? ''
            ]);
        }
        
        fclose($handle);
        
        return Response::download($filepath, $filename, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires' => '0',
            'Pragma' => 'public',
        ]);
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
        $sheet->setCellValue('A1', 'ID')->getStyle('A1')->applyFromArray($headerStyle);
        $sheet->setCellValue('B1', 'Número Embarcación')->getStyle('B1')->applyFromArray($headerStyle);
        // ... agregar todos los encabezados principales

        // Encabezados de documentación
        $docStartCol = 18; // Columna R
        $docHeaders = [
            'Permiso Turismo Náutico', 'Permiso Pesca Deportiva', 'Permiso Balandra CONANP',
            'Permiso Espíritu Santo CONANP', 'Permiso Tiburón Ballena DGVS',
            'Registro Nacional Turismo', 'Registro Nacional Embarcaciones',
            'Constancia Residencia/Acta Nacimiento', 'Carta Verdad Propia Oficina',
            'Carta Verdad Trabajado Zona Malecón', 'Carta No Concesión Playa ZOFEMAT',
            'Permiso Uso Muelle Fiscal API'
        ];

        foreach ($docHeaders as $index => $header) {
            $col = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($docStartCol + $index);
            $sheet->setCellValue($col.'1', $header)->getStyle($col.'1')->applyFromArray($headerStyle);
        }

        // Llenar datos
        foreach ($embarcaciones as $row => $embarcacion) {
            $doc = $embarcacion->documentacion;
            $dataRow = $row + 2; // Empieza en fila 2

            $sheet->setCellValue('A'.$dataRow, $embarcacion->id);
            $sheet->setCellValue('B'.$dataRow, $embarcacion->numero_embarcacion);
            // ... agregar todos los datos principales

            // Datos de documentación
            $sheet->setCellValue('R'.$dataRow, $doc->permiso_turismo_nautico ?? '');
            $sheet->setCellValue('S'.$dataRow, $doc->permiso_pesca_deportiva ?? '');
            // ... agregar todos los documentos
        }

        // Autoajustar columnas
        foreach (range('A', \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($docStartCol + count($docHeaders) - 1)) as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);

        return response()->streamDownload(
            function () use ($writer) {
                $writer->save('php://output');
            },
            'embarcaciones-registradas-'.now()->format('Y-m-d_H-i').'.xlsx',
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

        // Actualizar foto si se proporciona
        if ($request->hasFile('foto_embarcacion')) {
            // Eliminar foto anterior si existe
            if ($embarcacion->foto_embarcacion) {
                $oldPath = str_replace('/storage', '', $embarcacion->foto_embarcacion);
                Storage::disk('public')->delete($oldPath);
            }

            $foto = $request->file('foto_embarcacion');
            $carpetaCarrusel = $request->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
            $nombreCarpeta = 'embarcacion_' . $embarcacion->id; // Usamos ID en lugar del nombre
            $path = $foto->storeAs(
                "embarcaciones/{$carpetaCarrusel}/{$nombreCarpeta}", 
                'foto_embarcacion.' . $foto->extension(), 
                'public'
            );
            $embarcacion->foto_embarcacion = Storage::url($path);
            $embarcacion->save();
        }

        // Actualizar documentos
        $documentosData = [];
        $documentFields = [
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

        foreach ($documentFields as $field) {
            if ($request->hasFile($field)) {
                // Eliminar documento anterior si existe
                if ($embarcacion->documentacion && $embarcacion->documentacion->$field) {
                    $oldDocPath = str_replace('/storage', '', $embarcacion->documentacion->$field);
                    Storage::disk('public')->delete($oldDocPath);
                }

                $documento = $request->file($field);
                $carpetaCarrusel = $embarcacion->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
                $nombreCarpeta = 'embarcacion_' . $embarcacion->id; // Usamos ID en lugar del nombre
                $path = $documento->storeAs(
                    "embarcaciones/{$carpetaCarrusel}/{$nombreCarpeta}/documentos", 
                    $field . '.' . $documento->extension(), 
                    'public'
                );
                $documentosData[$field] = Storage::url($path);
            }
        }

        // Actualizar documentación
        if ($embarcacion->documentacion) {
            $embarcacion->documentacion->update($documentosData);
        } else {
            $documentosData['embarcacion_id'] = $embarcacion->id;
            DocumentacionEmbarcacion::create($documentosData);
        }
        
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
            $documentFields = [
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

            foreach ($documentFields as $field) {
                if ($embarcacion->documentacion->$field) {
                    $docPath = str_replace('/storage', '', $embarcacion->documentacion->$field);
                    Storage::disk('public')->delete($docPath);
                }
            }

            // Eliminar carpeta de documentos
            $carpetaCarrusel = $embarcacion->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B';
            $nombreCarpeta = 'embarcacion_' . $embarcacion->id; // Usamos ID en lugar del nombre
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