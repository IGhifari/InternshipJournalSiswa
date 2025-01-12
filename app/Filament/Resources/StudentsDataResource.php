<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentsDataResource\Pages;
use App\Filament\Resources\StudentsDataResource\RelationManagers;
use App\Models\StudentData;
use App\Models\StudentsData;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StudentsDataResource extends Resource
{
    protected static ?string $model = StudentData::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nis'),
                Forms\Components\TextInput::make('name'),
                Forms\Components\Radio::make('class')
                    ->options([
                        "XII RPL 1" => "XII RPL 1",
                        "XII RPL 2" => "XII RPL 2",
                    ]),
                Forms\Components\DatePicker::make('mulai_pkl'),
                Forms\Components\Radio::make('status_pkl')
                    ->options([
                        "Sedang PKL" => "Sedang PKL",
                        "Selesai PKL" => "Selesai PKL",
                    ]),
                Forms\Components\TextInput::make('phone'),
                Forms\Components\TextInput::make('email'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nis')->searchable(),
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('class')->searchable(),
                Tables\Columns\TextColumn::make('mulai_pkl'),
                Tables\Columns\TextColumn::make('status_pkl')->searchable(),
                Tables\Columns\TextColumn::make('phone')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable(),
                
            ])
            ->filters([
                SelectFilter::make('status_pkl')
                ->options([
                    'Sedang PKL' => 'Sedang PKL',
                    'Selesai PKL' => 'Selesai PKL',
                    
                ]),
                SelectFilter::make('class')
                ->options([
                    'XII RPL 2' => 'XII RPL 2',
                    'XII RPL 1' => 'XII RPL 1',
                    
                ])
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStudentsData::route('/'),
            'create' => Pages\CreateStudentsData::route('/create'),
            'edit' => Pages\EditStudentsData::route('/{record}/edit'),
        ];
    }
}
