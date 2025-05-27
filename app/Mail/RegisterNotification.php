<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisterNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        //return $this->markdown('emails.register.notification');
        return $this
        ->subject('Registro a Expo Emprendedores | H. XVII Ayuntamiento de La Paz')
        ->from('no-responder@lapaz.gob.mx', 'H. XVII Ayuntamiento de La Paz')
        ->markdown('emails.register.notification')
        ->with($this->data);
    }
}
