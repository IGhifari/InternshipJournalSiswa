<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {

        $adminPermission = Permission::firstOrCreate(['name' => 'access admin dashboard']);
         $studentPermission = Permission::firstOrCreate(['name' => 'access student dashboard']);

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
         $studentRole = Role::firstOrCreate(['name' => 'siswa']);

     $adminRole->givePermissionTo($adminPermission);
         $studentRole->givePermissionTo($studentPermission);

        $adminUsers = User::where('role', 'admin')->get(); // Misalnya berdasarkan field role di tabel users
        foreach ($adminUsers as $user) {
            $user->assignRole('admin');
           $user->givePermissionTo($adminPermission); // Memberikan permission ke admin
        }

        $studentUsers = User::where('role', 'siswa')->get();
    foreach ($studentUsers as $user) {
      $user->assignRole('siswa');
        $user->givePermissionTo($studentPermission); 
    }
}
}