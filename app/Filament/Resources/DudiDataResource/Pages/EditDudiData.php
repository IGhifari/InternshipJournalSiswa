<?php

namespace App\Filament\Resources\DudiDataResource\Pages;

use App\Filament\Resources\DudiDataResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDudiData extends EditRecord
{
    protected static string $resource = DudiDataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
