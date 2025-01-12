<?php

namespace App\Filament\Students\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Auth;

class WelcomeWidget extends Widget
{
    protected static string $view = 'filament.widgets.welcome-widget';

    public function getData(): array
    {
        $user = Auth::user();
        
        return [
            'name' => $user->name,
            'company' => $user->company, // Asumsikan kolom 'company' ada di tabel users
        ];
    }
    public function view()
{
    return view('filament.widgets.welcome-widget'); // Ini yang nge-include view tadi
}

}
