<?php

namespace App\Filament\Resources\StudentsDataResource\Pages;

use App\Filament\Resources\StudentsDataResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStudentsData extends EditRecord
{
    protected static string $resource = StudentsDataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
