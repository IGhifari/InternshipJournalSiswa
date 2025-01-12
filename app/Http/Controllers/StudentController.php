<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user()->load('company');
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user
            ],
        ]);
    }
}
