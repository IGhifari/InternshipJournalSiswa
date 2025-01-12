<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dudi_data', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('addres');
            $table->string('supervisor_name');
            $table->string('phone');
            $table->string('email');
            $table->string('logo');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dudi_data');
    }
};
