<?php

namespace App\Filament\Resources\StudentsDataResource\Pages;

use App\Filament\Resources\StudentsDataResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStudentsData extends ListRecords
{
    protected static string $resource = StudentsDataResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
