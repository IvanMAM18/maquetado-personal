<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ExpoEmprendedoresParticipantes;
use App\Models\ForoEmprendedoresParticipantes;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterNotification;
use Response;
use File;

class EmprendedoresParticipantesController extends Controller
{
    public static $giros_comerciales = [
        "Artesanías.",
        "Agricultura, Ganadería, Pesca, Caza y Minería.",
        "Comercio.",
        "Estudiante.",
        "Información en medios masivos (tecnológicos).",
        "",
        "Servicios Financieros y de Seguros.",
        "Servicios Inmobiliarios.",
        "Servicios Profesionales, Científicos y Técnicos.",
        "",
        "Servicios Educativos.",
        "Servicios de Salud y Assistencia Social.",
        "Servicios de Esparcimiento, Cultural y Deportivo.",
        "Servicios de Alojamiento Temporal y de Preparación de Alimentos y Bebidas.", 
        "Otros.",
    ];
    
    public static $municipios = [
        "La Paz",
        "Cabo",
        "Comondú",
        "Loreto",
        "Mulegé",
    ];
    
    public static $sexos = [
        "F",
        "M",
        "Sin respuesta",
    ];
    
    public static $edades = [
        "15-29",
        "30-55",
        "55-65",
        "65 ó más",
    ];
    
    public function index($tipo = 'expo')
    {
        return view('dashboard.registros', ['tipo' => $tipo]);
    }
    
    public function registroParticipante(Request $request, $tipo)
    {
        $validator = Validator::make($request->all(), [
            'nombre_empresa' => 'required',
            'giro' => 'required',
            'telefono' => 'required',
            'correo' => 'required|email',
            'municipio' => 'required',
            'colonia' => 'required',
            'sexo' => 'required',
            'edad' => 'required',
            'año' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $model = $tipo === 'foro' 
            ? ForoEmprendedoresParticipantes::class 
            : ExpoEmprendedoresParticipantes::class;
        
        $participante = $model::create($validator->validate());
        
        if ($participante !== null) {
            Mail::to($participante->correo)->send(new RegisterNotification([
                'name' => $participante->nombre_empresa
            ]));
        }
        
        return response()->json([
            'message' => 'Registro exitoso!',
            'participante' => $participante
        ], 201);
    }
    
    public function all($tipo)
    {
        $model = $tipo === 'foro' 
            ? ForoEmprendedoresParticipantes::class 
            : ExpoEmprendedoresParticipantes::class;
            
        return $model::all()->map(function($item) {
            $item->created_at_formatted = $item->created_at->format('Y-m-d H:i:s');
            return $item;
        });
    }
    
    public function numeroDeRegistros($tipo)
    {
        $model = $tipo === 'foro' 
            ? ForoEmprendedoresParticipantes::class 
            : ExpoEmprendedoresParticipantes::class;
            
        // return count($model::where("año", 2025)->get()->toArray()); Solo por un solo año
        return $model::count(); // Cuenta todos los registros
    }
    
    public function obtenerCSVRegistrados($tipo)
    {
        $model = $tipo === 'foro' 
            ? ForoEmprendedoresParticipantes::class 
            : ExpoEmprendedoresParticipantes::class;
            
        // Eliminamos el where("año", 2025) para obtener todos los registros
        $registros = $model::orderBy('año')->orderBy('created_at')->get();
        
        $filename = $tipo . "-personas-registradas.csv";
        $filepath = public_path("files/" . $filename);
        
        if (!File::exists(public_path()."/files")) {
            File::makeDirectory(public_path() . "/files");
        }
        
        $handle = fopen($filepath, 'w');
        
        fputcsv($handle, [
            'Nombre',
            'Correo',
            'Télefono',
            'Giro',
            'Municipio',
            'Colonia',
            'Sexo',
            'Edad',
            'Año',
            'Fecha de creacion'
        ]);
        
        foreach ($registros as $registro) {
            fputcsv($handle, [
                $registro->nombre_empresa,
                $registro->correo,
                $registro->telefono,
                self::$giros_comerciales[$registro->giro],
                self::$municipios[($registro->municipio) - 1],
                $registro->colonia,
                self::$sexos[($registro->sexo) - 1],
                self::$edades[($registro->edad) - 1],
                $registro->año,
                $registro->created_at
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
}