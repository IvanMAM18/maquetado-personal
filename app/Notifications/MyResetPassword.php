<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Auth\Notifications\ResetPassword;


class MyResetPassword extends ResetPassword
{

    public function toMail($notifiable)
    {
        $notifiable->remember_token = $this->token;
        $notifiable->save();
        return (new MailMessage)
        ->subject('Recuperar contraseña')
        ->greeting('Hola, '.$notifiable->name)
        ->line('Estás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta. Da click en el boton para actualizar tu contraseña.')
        ->action('Recuperar contraseña', url('password/reset', $this->token))
        ->line('Si no realizaste esta solicitud, no se requiere realizar ninguna otra acción.')
        ->salutation('Saludos, H.XVIII Ayuntamiento de La Paz');

    }
}
