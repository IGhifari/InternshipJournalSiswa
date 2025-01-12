<?php

namespace App\Filament\Resources\CompanyDataResource\Widgets;

use App\Models\DudiData;
use App\Models\SupervisorData;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CompanyDataWidget extends BaseWidget
{

    protected function getStats(): array
    {
        return [
            Stat::make('Jumlah Perusahaan', DudiData::count()) 
            ->description('Jumlah perusahaan yang terdaftar')
            ->descriptionColor('warning')
            ->url(route('filament.admin.resources.dudi-datas.index'))
            ->icon('heroicon-o-home-modern'),
            Stat::make('Jumlah Supervisor', SupervisorData::count()) 
            ->description('Jumlah supervisor yang terdaftar')
            ->descriptionColor('warning')
            ->url(route('filament.admin.resources.dudi-datas.index'))
            ->icon('heroicon-o-home-modern'),
        ];
    }
}
