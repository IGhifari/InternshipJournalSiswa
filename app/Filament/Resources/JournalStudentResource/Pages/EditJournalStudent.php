<?php

namespace App\Filament\Resources\JournalStudentResource\Pages;

use App\Filament\Resources\JournalStudentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditJournalStudent extends EditRecord
{
    protected static string $resource = JournalStudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
