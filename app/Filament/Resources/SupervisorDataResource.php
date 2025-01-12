<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SupervisorDataResource\Pages;
use App\Filament\Resources\SupervisorDataResource\RelationManagers;
use App\Models\SupervisorData;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
class SupervisorDataResource extends Resource
{
    protected static ?string $model = SupervisorData::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('supervisor_name'),
                Forms\Components\TextInput::make('phone'),
                Forms\Components\TextInput::make('company_id')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('supervisor_name')->searchable(),
                Tables\Columns\TextColumn::make('company.company')->searchable(),
                Tables\Columns\TextColumn::make('phone')->searchable(),
            ])
            ->filters([
                
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
            'index' => Pages\ListSupervisorData::route('/'),
            'create' => Pages\CreateSupervisorData::route('/create'),
            'edit' => Pages\EditSupervisorData::route('/{record}/edit'),
        ];
    }
}
