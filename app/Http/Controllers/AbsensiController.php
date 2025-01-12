<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absensi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class AbsensiController extends Controller
{
    public function index()
    {
        
        $user = Auth::user();
        $data = Absensi::where('name', $user->name)->get();
        

        return Inertia::render('absen', [
            'absensiData' => $data,
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'date' => 'required|date',
            'information' => 'required|string',
        ]);

        $absensi = Absensi::create($data);

        return response()->json($absensi, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'date' => 'required|date',
            'information' => 'required|string',
        ]);

        $absensi = Absensi::findOrFail($id);
        $absensi->update($data);

        return response()->json($absensi, 200);
    }

    public function delete(Request $request, $id){
        $absensi = Absensi::findOrFail($id);
        $absensi->delete();
        return response()->json($absensi, 200);
    }
}
