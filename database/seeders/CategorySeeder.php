<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Comics']);
        Category::create(['name' => 'Films']);
        Category::create(['name' => 'Animation']);
        Category::create(['name' => 'Documentation']);
        Category::create(['name' => 'Others']);
        Category::create(['name' => 'Books']);
    }
}
