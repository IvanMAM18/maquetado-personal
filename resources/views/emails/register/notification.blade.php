@component('mail::message')

# Registro exitoso!

Hola {{ $name }},

Tu registro a Expo Emprendedor se a realizado con éxito!

@component('mail::button', ['url' => 'https://expoemprendedores.lapaz.gob.mx/'])
Volver a Expo Emprendedores
@endcomponent
<div class="test-styles">
    <div></div>
    <div></div>
</div>
Gracias!<br>
@endcomponent
