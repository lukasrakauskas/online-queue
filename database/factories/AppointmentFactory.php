<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Appointment;
use App\User;

$factory->define(Appointment::class, function (Faker $faker) {
    $display_number = 0;
    do {
        $display_number = $faker->unique()->numberBetween(0, 999);
    } while (Appointment::where('display_number', $display_number)->exists());

    return [
        'display_number' => $display_number,
        'specialist_id' => User::all()->random()->id
    ];
});
