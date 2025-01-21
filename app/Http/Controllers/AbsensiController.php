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
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photoPath = $request->file('photo')->store('absensi_photos', 'public');

    
        $absensi = new Absensi();
        $absensi->name = $request->name;
        $absensi->class = $request->class;
        $absensi->date = $request->date;
        $absensi->information = $request->information;
        $absensi->photo = $photoPath; // Simpan path foto
        $absensi->save();

        return response()->json($absensi, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'date' => 'required|date',
            'information' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
