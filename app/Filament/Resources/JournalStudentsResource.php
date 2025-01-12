<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JournalStudentsResource\Pages;
use App\Filament\Resources\JournalStudentsResource\RelationManagers;
use App\Models\JournalStudent;
use App\Models\JournalStudents;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Carbon;

class JournalStudentsResource extends Resource
{
    protected static ?string $model = JournalStudent::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name'),
                Forms\Components\TextInput::make('class'),
                Forms\Components\TextInput::make('company'),
                Forms\Components\TextInput::make('supervisor_name'),
                Forms\Components\DatePicker::make('date'),
                Forms\Components\TextInput::make('activity'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('class')->searchable(),
                Tables\Columns\TextColumn::make('company')->searchable(),
                Tables\Columns\TextColumn::make('supervisor_name')->searchable(),
                Tables\Columns\TextColumn::make('date'),
                Tables\Columns\TextColumn::make('activity'),
            ])
            ->filters([
                SelectFilter::make('class')
                ->options([
                    'XII RPL 1' => 'XII RPL 1',
                    'XII RPL 2' => 'XII RPL 2',
                ]),
                SelectFilter::make('company')
                ->options([
                    'PT SUKAMAJU' => 'PT SUKAMAJU',
                    'PT INDOCORSA' => 'PT INDOCORSA',
                    'PT INDOCEMENT' => 'PT INDOCEMENT',
                    'PT EXAMPLE' => 'PT EXAMPLE',
                ]),
                SelectFilter::make('supervisor_name')
                ->options([
                    'Ghifari' => 'Ghifari',
                    'Mutia' => 'Mutia',
                    'Rizqi' => 'Rizqi',
                    'Example' => 'Example',
                ]),
                // SelectFilter::make('date')
                // ->label('Filter by date')
                // ->options([
                //     'yesterday' => 'Kemarin',
                //     'two_days_ago' => 'Dua Hari yang Lalu',
                //     'this_week' => 'Minggu Ini',
                //     'last_week' => 'Minggu Lalu',
                //     'this_month' => 'Bulan Ini',
                //     'this_year' => 'Tahun Ini',
                //     'two_years_ago' => 'Dua Tahun yang Lalu',
                // ])
                SelectFilter::make('date')
                    ->label('Filter by date')
                    
                    ->options([
                        'today' => now(),
                        'yesterday' => now()->subDay(),
                        'two_days_ago' => now()->subDays(2),
                        'this_week' => now()->startOfWeek(),
                        'last_week' => now()->subWeek()->startOfWeek(),
                        'this_month' => now()->startOfMonth(),
                        'this_year' => now()->startOfYear(),
                        'two_years_ago' => now()->subYears(2)->startOfYear(),
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
            
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListJournalStudents::route('/'),
            'create' => Pages\CreateJournalStudents::route('/create'),
            'view' => Pages\ViewJournalStudents::route('/{record}'),
            'edit' => Pages\EditJournalStudents::route('/{record}/edit'),
        ];
    }
}
