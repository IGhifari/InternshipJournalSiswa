<?php

namespace App\Filament\Resources\JournalStudentResource\Pages;

use App\Filament\Resources\JournalStudentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListJournalStudents extends ListRecords
{
    protected static string $resource = JournalStudentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
