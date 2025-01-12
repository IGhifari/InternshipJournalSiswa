<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JournalStudent;

class JurnalController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $jurnalData = JournalStudent::where('name', $user->name)->get();
        return Inertia::render('jurnal', [
            'jurnalData' => $jurnalData, 
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'company' => 'required|string',
            'supervisor_name' => 'required|string',
            'date' => 'required|date',
            'activity' => 'required|string',
        ]);

        $jurnal = JournalStudent::create($data);

        return response()->json($jurnal, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'class' => 'required|string',
            'company' => 'required|string',
            'supervisor_name' => 'required|string',
            'date' => 'required|date',
            'activity' => 'required|string',
        ]);

        $jurnal = JournalStudent::findOrFail($id);
        $jurnal->update($data);

        return response()->json($jurnal, 200);
    }
    public function delete(Request $request, $id){
        $jurnal = JournalStudent::findOrFail($id);
        $jurnal->delete();
        return response()->json($jurnal, 200);
    }
}