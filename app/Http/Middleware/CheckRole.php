<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CheckRole
{
    public function handle(Request $request, Closure $next)
    {
        $userrole = User::where('id', Auth::user()->id)->first();
        if (Auth::check() && Auth::user()->role == 'admin') {
            return $next($request);
        }elseif(Auth::check() && Auth::user()->role == 'siswa'){
            return redirect('/dashboard');
        }
        return redirect('/'); 
    }
}