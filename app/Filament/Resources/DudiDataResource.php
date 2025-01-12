<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DudiDataResource\Pages;
use App\Filament\Resources\DudiDataResource\RelationManagers;
use App\Models\DudiData;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\SelectFilter;
class DudiDataResource extends Resource
{
    protected static ?string $model = DudiData::class;

    protected static ?string $navigationIcon = 'heroicon-o-home-modern';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('company'),
                Forms\Components\TextInput::make('addres'),
                Forms\Components\TextInput::make('supervisor_name'),
                Forms\Components\TextInput::make('phone'),
                Forms\Components\TextInput::make('email'),
                Forms\Components\FileUpload::make('logo'),


            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company')->searchable(),
                Tables\Columns\TextColumn::make('addres')->searchable(),
                Tables\Columns\TextColumn::make('supervisor.supervisor_name')->searchable(),
                Tables\Columns\TextColumn::make('phone')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable(),
                Tables\Columns\ImageColumn::make('logo'),
            ])
            ->filters([
                SelectFilter::make('company')
                ->options([
                    'PT Sukamaju' => 'PT Sukamaju',
                    'PT Indocorsa' => 'PT Indocorsa',
                ]),
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
            'index' => Pages\ListDudiData::route('/'),
            'create' => Pages\CreateDudiData::route('/create'),
            'edit' => Pages\EditDudiData::route('/{record}/edit'),
        ];
    }
}
