<?php

namespace App\Filament\Resources\SupervisorDataResource\Pages;

use App\Filament\Resources\SupervisorDataResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSupervisorData extends ListRecords
{
    protected static string $resource = SupervisorDataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
