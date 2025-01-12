<?php

namespace App\Filament\Resources\JournalStudentsResource\Pages;

use App\Filament\Resources\JournalStudentsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListJournalStudents extends ListRecords
{
    protected static string $resource = JournalStudentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
