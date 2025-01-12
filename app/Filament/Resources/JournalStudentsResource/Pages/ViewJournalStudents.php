<?php

namespace App\Filament\Resources\JournalStudentsResource\Pages;

use App\Filament\Resources\JournalStudentsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewJournalStudents extends ViewRecord
{
    protected static string $resource = JournalStudentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
