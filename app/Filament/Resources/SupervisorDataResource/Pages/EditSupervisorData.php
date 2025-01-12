<?php

namespace App\Filament\Resources\SupervisorDataResource\Pages;

use App\Filament\Resources\SupervisorDataResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSupervisorData extends EditRecord
{
    protected static string $resource = SupervisorDataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
