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

    public function store(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'date' => 'required|date',
            'information' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
        ]);
    
        $absensi = Absensi::findOrFail($id);
        $absensi->update($data); // Use $data to update the model
    
        // Handle photo upload if exists
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('absensi_photos', 'public');
            $absensi->photo = $photoPath;
            $absensi->save();
        }
    
        return response()->json($absensi, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'date' => 'required|date',
            'information' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
        ]);

        $absensi = Absensi::findOrFail($id);
        $absensi->update($data);

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('absensi_photos', 'public');
            $absensi->photo = $photoPath;
            $absensi->save();
        }

        return response()->json($absensi, 200);
    }

    public function delete(Request $request, $id){
        $absensi = Absensi::findOrFail($id);
        $absensi->delete();
        return response()->json($absensi, 200);
    }
}
