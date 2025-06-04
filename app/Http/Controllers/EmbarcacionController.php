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

class EmbarcacionController extends Controller
{
    public static $turnos = [
        "Matutino",
        "Vespertino",
        "Nocturno"
    ];
    
    public static $servicios = [
        "Paseo turístico",
        "Pesca deportiva",
        "Tour de buceo",
        "Avistamiento de ballenas",
        "Transporte privado",
        "Otros"
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
            
            // Documentación
            'permiso_turismo_nautico' => 'nullable',
            'permiso_pesca_deportiva' => 'nullable',
            'permiso_balandra_conanp' => 'nullable',
            'permiso_espiritu_santo_conanp' => 'nullable',
            'permiso_tiburon_ballena_dgvs' => 'nullable',
            'registro_nacional_turismo' => 'nullable',
            'registro_nacional_embarcaciones' => 'nullable',
            'constancia_residencia_acta_nacimiento' => 'nullable',
            'carta_verdad_propia_oficina' => 'nullable',
            'carta_verdad_trabajado_zona_malecon' => 'nullable',
            'carta_no_concesion_playa_zofemat' => 'nullable',
            'permiso_uso_muelle_fiscal_api' => 'nullable'
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        // Crear la embarcación
        $embarcacion = Embarcacion::create($request->only([
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
            'telefono_siniestros'
        ]));
        
        // Crear la documentación asociada
        if ($embarcacion) {
            $documentacion = $embarcacion->documentacion()->create($request->only([
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
            ]));
            
            // Enviar notificación por correo
            Mail::to($embarcacion->email_contacto)->send(new RegisterNotification([
                'name' => $embarcacion->nombre_embarcacion
            ]));
        }
        
        return response()->json([
            'message' => 'Embarcación registrada exitosamente!',
            'embarcacion' => $embarcacion,
            'documentacion' => $documentacion ?? null
        ], 201);
    }
    
    public function all()
    {
        return Embarcacion::with('documentacion')->get()->map(function($item) {
            $item->created_at_formatted = $item->created_at->format('Y-m-d H:i:s');
            $item->hora_salida_formatted = $item->hora_salida->format('H:i');
            $item->vigencia_certificado_formatted = $item->vigencia_certificado_seguridad->format('Y-m-d');
            return $item;
        });
    }
    
    public function obtenerCSVRegistrados()
    {
        $registros = Embarcacion::with('documentacion')
            ->orderBy('created_at')
            ->get();
        
        $filename = "embarcaciones-registradas.csv";
        $filepath = public_path("files/" . $filename);
        
        if (!File::exists(public_path()."/files")) {
            File::makeDirectory(public_path() . "/files");
        }
        
        $handle = fopen($filepath, 'w');
        
        // Encabezados
        fputcsv($handle, [
            'Número Embarcación',
            'Nombre Embarcación',
            'Permiso Náutico',
            'Permisionario',
            'Representante',
            'Capacidad',
            'Turno',
            'Hora Salida',
            'Teléfono Contacto',
            'Email Contacto',
            'Servicio',
            'Vigencia Certificado',
            'Póliza Seguro',
            'Teléfono Siniestros',
            'Fecha Registro'
        ]);
        
        // Datos
        foreach ($registros as $registro) {
            fputcsv($handle, [
                $registro->numero_embarcacion,
                $registro->nombre_embarcacion,
                $registro->numero_permiso_nautico,
                $registro->nombre_permisionario,
                $registro->nombre_representante,
                $registro->capacidad_pasajeros,
                $registro->turno_salida,
                $registro->hora_salida_formatted,
                $registro->telefono_contacto,
                $registro->email_contacto,
                $registro->servicio_ofrecido,
                $registro->vigencia_certificado_formatted,
                $registro->numero_poliza_seguro,
                $registro->telefono_siniestros,
                $registro->created_at_formatted
            ]);
        }
        
        fclose($handle);
        
        return Response::download($filepath, $filename, [
            'Content-Type' => 'application/vnd.ms-excel; charset=utf-8',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires' => '0',
            'Pragma' => 'public',
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $embarcacion = Embarcacion::with('documentacion')->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'numero_embarcacion' => 'required|unique:embarcaciones,numero_embarcacion,'.$id,
            'nombre_embarcacion' => 'required',
            'numero_permiso_nautico' => 'required|unique:embarcaciones,numero_permiso_nautico,'.$id,
            // ... otros campos de validación (similar a registroEmbarcacion)
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        // Actualizar embarcación
        $embarcacion->update($request->only([
            'numero_embarcacion',
            'nombre_embarcacion',
            // ... otros campos de embarcación
        ]));
        
        // Actualizar documentación si existe
        if ($embarcacion->documentacion) {
            $embarcacion->documentacion->update($request->only([
                'permiso_turismo_nautico',
                // ... otros campos de documentación
            ]));
        }
        
        return response()->json([
            'message' => 'Embarcación actualizada exitosamente!',
            'embarcacion' => $embarcacion
        ]);
    }
    
    public function destroy($id)
    {
        $embarcacion = Embarcacion::findOrFail($id);
        
        // Eliminar primero la documentación asociada
        if ($embarcacion->documentacion) {
            $embarcacion->documentacion->delete();
        }
        
        // Luego eliminar la embarcación
        $embarcacion->delete();
        
        return response()->json([
            'message' => 'Embarcación eliminada exitosamente!'
        ]);
    }
}