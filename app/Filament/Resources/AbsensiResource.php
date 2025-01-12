<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AbsensiResource\Pages;
use App\Filament\Resources\AbsensiResource\RelationManagers;
use App\Models\Absensi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\SelectFilter;

class AbsensiResource extends Resource
{
    protected static ?string $model = Absensi::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name'),
                Forms\Components\Radio::make('class')
                ->options([
                    "XII RPL 1" => "XII RPL 1",
                    "XII RPL 2" => "XII RPL 2",
                ]),
                Forms\Components\DatePicker::make('date'),
                Forms\Components\Radio::make('information')
                    ->options([
                        "Hadir" => "Hadir",
                        "Sakit" => "Sakit",
                        "Terlambat" => "Terlambat",
                        "Izin" => "Izin",
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('class')->searchable(),
                Tables\Columns\TextColumn::make('date'),
                Tables\Columns\TextColumn::make('information')->searchable(),
            ])
            ->filters([
                SelectFilter::make('class')
                ->options([
                    'XII RPL 1' => 'XII RPL 1',
                    'XII RPL 2' => 'XII RPL 2',
                ]),
                SelectFilter::make('information')
                ->options([
                    "Hadir" => "Hadir",
                    "Sakit" => "Sakit",
                    "Terlambat" => "Terlambat",
                    "Izin" => "Izin",
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
            'index' => Pages\ListAbsensis::route('/'),
            'create' => Pages\CreateAbsensi::route('/create'),
            'edit' => Pages\EditAbsensi::route('/{record}/edit'),
        ];
    }
}
