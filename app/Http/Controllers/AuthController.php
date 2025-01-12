<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Controllers\Controller;

class AuthController extends BaseController
{
    public function showLoginForm()
    {
        return view('auth.login'); // Nanti kita bikin view ini
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            // Cek role
            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } elseif ($user->role === 'student') {
                return redirect()->route('students.dashboard');
            }
        }

        return back()->withErrors(['login' => 'Email atau password salah, bro!']);
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
