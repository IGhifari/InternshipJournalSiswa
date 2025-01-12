<?php

namespace App\Filament\Resources\StudentDataResource\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Student; // Pastikan model Student sudah ada
use App\Models\StudentData;
use Illuminate\Support\Facades\DB;
class StudentsDataWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            // Statistik untuk jumlah total siswa
            Stat::make('Jumlah Siswa', StudentData::count()) 
                ->color('blue')
                ->url(route('filament.admin.resources.students-datas.index'))
                ->descriptionColor('warning')
                ->description('Jumlah siswa yang terdaftar')
                ->icon('heroicon-o-user-group'),
            Stat::make('Siswa Kelas XII RPL 1', StudentData::where('class', 'XII RPL 1')->count()) 
                ->color('success')
                ->icon('heroicon-o-user-group')
                ->descriptionColor('warning')
                ->description('Jumlah siswa kelas XII RPL 1 yang terdaftar'),
            Stat::make('Siswa Kelas XII RPL 2', StudentData::where('class', 'XII RPL 2')->count()) 
                ->color('success')
                ->descriptionColor('warning')
                ->description('Jumlah siswa kelas XII RPL 2 yang terdaftar')
                ->icon('heroicon-o-user-group'),
        ];
    }
}
