<?php

namespace App\Filament\Resources\JournalStudentsResource\Pages;

use App\Filament\Resources\JournalStudentsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditJournalStudents extends EditRecord
{
    protected static string $resource = JournalStudentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
