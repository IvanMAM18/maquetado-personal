<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EjemploEmbarcacion;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Mail\EmbarcacionMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Rol;
use Auth;

class EjemploEmbarcacionController extends Controller
{
    public function index()
    {
        return view('embarcaciones.index');
    }

    public function indexWelcome()
    {
        return view('embarcaciones.welcome');
    }

    public function indexAdmin()
    {
        $user_rol = Auth::user()->rol_id;
        $rol = Rol::where('id', $user_rol)->first();
        $department_id = Auth::user()->department_id;

        if (($rol->name === 'Super Admin') || ($rol->name === 'Embarcaciones')) {
            return view('embarcaciones.admin');
        }
        
        abort(403);
    }

    public function indexDashboard()
    {
        return view('embarcaciones.dashboard');
    }

    public function store(Request $request)
    {
        $request->validate([
            'numero_embarcacion' => 'required',
            'nombre_embarcacion' => 'required',
            'foto_embarcacion' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->except('foto_embarcacion');

        try {
            if ($request->hasFile('foto_embarcacion')) {
                $file = $request->file('foto_embarcacion');
                $folderName = 'embarcaciones/' . ($request->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B');
                
                $fileName = 'embarcacion_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs($folderName, $fileName, 'public');
                $data['foto_embarcacion'] = Storage::url($path);
            }

            $embarcacion = EjemploEmbarcacion::create($data);
            
            // Mover a carpeta con ID si es nuevo registro
            if ($request->hasFile('foto_embarcacion')) {
                $newFolderName = 'embarcaciones/' . ($request->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B') . '/' . $embarcacion->id;
                $newPath = str_replace($folderName, $newFolderName, $path);
                Storage::move($path, $newPath);
                $embarcacion->foto_embarcacion = Storage::url($newPath);
                $embarcacion->save();
            }

            return response()->json([
                'embarcacion' => $embarcacion,
                'success' => true
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
                'success' => false
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'numero_embarcacion' => 'required',
            'nombre_embarcacion' => 'required',
            'foto_embarcacion' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $embarcacion = EjemploEmbarcacion::findOrFail($id);
        $data = $request->except('foto_embarcacion');

        try {
            if ($request->hasFile('foto_embarcacion')) {
                // Eliminar foto anterior si existe
                if ($embarcacion->foto_embarcacion) {
                    $oldPath = str_replace('/storage', '', $embarcacion->foto_embarcacion);
                    Storage::disk('public')->delete($oldPath);
                }

                $file = $request->file('foto_embarcacion');
                $folderName = 'embarcaciones/' . ($request->carrusel === 'A' ? 'carrusel_A' : 'carrusel_B') . '/' . $id;
                $fileName = 'embarcacion_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs($folderName, $fileName, 'public');
                $data['foto_embarcacion'] = Storage::url($path);
            }

            $embarcacion->update($data);

            return response()->json([
                'embarcacion' => $embarcacion,
                'success' => true
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
                'success' => false
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $embarcacion = EjemploEmbarcacion::findOrFail($id);
            
            // Eliminar foto si existe
            if ($embarcacion->foto_embarcacion) {
                $path = str_replace('/storage', '', $embarcacion->foto_embarcacion);
                Storage::disk('public')->delete($path);
                // Eliminar carpeta
                $folderPath = dirname($path);
                Storage::disk('public')->deleteDirectory($folderPath);
            }
            
            $embarcacion->delete();

            return response()->json(['success' => true]);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage(),
                'success' => false
            ], 500);
        }
    }

    public function all()
    {
        return EjemploEmbarcacion::orderBy('id', 'desc')->get();
    }

    public function getData($id)
    {
        return EjemploEmbarcacion::findOrFail($id);
    }

    public function getDataAll()
    {
        return EjemploEmbarcacion::orderBy('id', 'desc')->get();
    }

    public function sendStatusEmail(Request $request, $id)
    {
        try {
            $embarcacion = EjemploEmbarcacion::findOrFail($id);
    
            $validated = $request->validate([
                'estado' => 'required|in:aprobado,rechazado',
                'motivo_rechazo' => 'required_if:estado,rechazado|string|max:500'
            ]);
    
            try {
                Mail::to($embarcacion->email_contacto)
                    ->send(new EmbarcacionMail([
                        'nombre_embarcacion' => $embarcacion->nombre_embarcacion,
                        'email_contacto' => $embarcacion->email_contacto,
                        'fecha' => $embarcacion->created_at->format('d/m/Y H:i'),
                        'estado' => $validated['estado'],
                        'motivo_rechazo' => $validated['motivo_rechazo'] ?? null
                    ]));
            } catch (\Exception $e) {
                \Log::error('Error enviando correo: '.$e->getMessage());
            }
    
            return response()->json(['success' => true]);
    
        } catch (\Throwable $th) {
            \Log::error('Error: '.$th->getMessage());
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function createXLS()
    {
        $embarcaciones = EjemploEmbarcacion::all();

        if ($embarcaciones->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No hay embarcaciones para exportar'
            ], 404);
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $headers = [
            'A1' => 'ID',
            'B1' => 'Número de Embarcación',
            'C1' => 'Nombre de Embarcación',
            'D1' => 'Número de Permiso Náutico',
            'E1' => 'Nombre del Permisionario',
            'F1' => 'Nombre del Representante',
            'G1' => 'Capacidad de Pasajeros',
            'H1' => 'Turno de Salida',
            'I1' => 'Hora de Salida',
            'J1' => 'Teléfono de Contacto',
            'K1' => 'Email de Contacto',
            'L1' => 'Servicio Ofrecido',
            'M1' => 'Vigencia Certificado Seguridad',
            'N1' => 'Número Póliza Seguro',
            'O1' => 'Teléfono Siniestros',
            'P1' => 'Carrusel',
            'Q1' => 'Foto Embarcación'
        ];

        $centeredStyle = [
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER
            ]
        ];

        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value)
                ->getStyle($cell)
                ->applyFromArray($centeredStyle + ['font' => ['bold' => true]]);
        }

        foreach ($embarcaciones as $index => $embarcacion) {
            $row = $index + 2;
            $cells = [
                'A' => $embarcacion->id,
                'B' => $embarcacion->numero_embarcacion,
                'C' => $embarcacion->nombre_embarcacion,
                'D' => $embarcacion->numero_permiso_nautico,
                'E' => $embarcacion->nombre_permisionario,
                'F' => $embarcacion->nombre_representante,
                'G' => $embarcacion->capacidad_pasajeros,
                'H' => $embarcacion->turno_salida,
                'I' => $embarcacion->hora_salida,
                'J' => $embarcacion->telefono_contacto,
                'K' => $embarcacion->email_contacto,
                'L' => $embarcacion->servicio_ofrecido,
                'M' => $embarcacion->vigencia_certificado_seguridad,
                'N' => $embarcacion->numero_poliza_seguro,
                'O' => $embarcacion->telefono_siniestros,
                'P' => $embarcacion->carrusel,
                'Q' => $embarcacion->foto_embarcacion ? 'Sí' : 'No'
            ];

            foreach ($cells as $col => $value) {
                $sheet->setCellValue($col.$row, $value)
                    ->getStyle($col.$row)
                    ->applyFromArray($centeredStyle);
            }
        }

        $spreadsheet->getDefaultStyle()->getFont()->setSize(12);
        
        foreach (range('A', 'Q') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);

        return response()->streamDownload(
            function () use ($writer) {
                $writer->save('php://output');
            },
            'embarcaciones-'.now()->format('Y-m-d_H-i').'.xlsx',
            [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Cache-Control' => 'max-age=0'
            ]
        );
    }
}