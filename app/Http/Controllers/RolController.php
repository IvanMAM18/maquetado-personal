<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('dashboard_admin.roles');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rol = Rol::create($request->all());
        return $rol;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function show(Rol $rol)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function edit(Rol $rol)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $rol = Rol::where('id',$request['id'])->first();
        $rol->fill($request->toArray());
        $rol->save();
        return $rol;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rol $rol)
    {
        $rol->delete();
    }

    public function all(){
        $roles = Rol::all();
        return $roles;
    }
}
