<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ExpoEmprendedoresParticipantes;

use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterNotification;

use Response;
use File;


class ExpoEmprendedoresParticipantesController extends Controller
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
        "La Paz" ,
        "Cabo" ,
        "Comondú" ,
        "Loreto" ,
        "Mulegé" ,
    ];
    public static $sexos = [
        "F" ,
        "M" ,
        "Sin respuesta" ,
    ];
    public static $edades = [
        "15-29" ,
        "30-55" ,
        "55-65" ,
        "65 ó más" ,
    ];
    
    public function index (){
        return view('dashboard.registros');
    }

    public function registroParticipante(Request $request){
        $validator = Validator::make($request->all(),[
            'nombre_empresa'=>'required',
            'giro'=>'required',
            'telefono'=>'required',
            'correo'=>'required|email',
            'municipio'=>'required',
            'colonia'=>'required',
            'sexo'=>'required',
            'edad'=>'required',
            'año'=>'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }

        $participante = ExpoEmprendedoresParticipantes::create($validator->validate());

        if($participante!==null){
            Mail::to($participante->correo)->send(new RegisterNotification([
                'name' => $participante->nombre_empresa
                //'fecha'=>$cita->fecha,
                //'hora'=>$cita->hora,
                //'codigo'=>$cita->codigo
            ]));
        }
        

        return response()->json([
            'message'=>'Registro exitoso!',
            'participante'=>$participante
        ],201);
    }

    public function all (){
        return ExpoEmprendedoresParticipantes::where("año",2024)->get();
    }
    public function numeroDeRegistros (){
        return count(ExpoEmprendedoresParticipantes::where("año",2024)->get()->toArray());
    }
    public function obtenerCSVRegistrados(){
        $registros = ExpoEmprendedoresParticipantes::where("año",2024)->get();

        // these are the headers for the csv file.
        $headers = array(
            'Content-Type' => 'application/vnd.ms-excel; charset=utf-8',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Content-Disposition' => 'attachment; filename=expo-personas-registradas.csv',
            'Expires' => '0',
            'Pragma' => 'public',
        );


        //I am storing the csv file in public >> files folder. So that why I am creating files folder
        if (!File::exists(public_path()."/files")) {
            File::makeDirectory(public_path() . "/files");
        }

        //creating the download file
        $filename =  public_path("files/expo-personas-registradas.csv");
        $handle = fopen($filename, 'w');

        //adding the first row
        fputcsv($handle, [
            'Nombre',
            'Correo',
            'Télefono',
            'Giro',
            'Municipio',
            'Colonia',
            'Sexo',
            'Edad',
            'Año'
        ]);

        //adding the data from the array
        foreach ($registros as $each_reistro) {
            fputcsv($handle, [
                $each_reistro->nombre_empresa,
                $each_reistro->correo,
                $each_reistro->telefono,
                $this::$giros_comerciales[$each_reistro->giro],
                $this::$municipios[($each_reistro->municipio) - 1],
                $each_reistro->colonia,
                $this::$sexos[($each_reistro->sexo) - 1],
                $this::$edades[($each_reistro->edad) - 1],
                $each_reistro->año
            ]);
        }
        fclose($handle);

        //download command
        return Response::download($filename, "expo-personas-registradas.csv", $headers);
    }
}
