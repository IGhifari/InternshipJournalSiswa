<?php

namespace App\Filament\Resources\SupervisorDataResource\Widgets;

use App\Models\SupervisorData;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SupervisorDataWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Jumlah Supervisor', SupervisorData::count()) 
                ->color('success')
                ->url(route('filament.admin.resources.supervisor-datas.index'))
                ->icon('heroicon-o-briefcase'),
        ];
    }
}
