<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $queue = Appointment::where('active', true)
            ->orderBy('created_at')
            ->orderBy('id')
            ->get();

        $waiting = Appointment::where('active', false)
            ->orderBy('created_at')
            ->orderBy('id')
            ->take(5)
            ->get();

        return ['data' => ['active' => $queue, 'queue' => $waiting]];
    }

    public function timeLeft($appointmentId)
    {
        $appointment = Appointment::find($appointmentId);

        if ($appointment === null) {
            abort(404, 'Appointment not found.');
        }

        if ($appointment->started_at != null) {
            return ['data' => ['time_left' => 'just now']];
        }

        $specialist = User::find($appointment->specialist_id);

        if ($specialist === null) {
            abort(404, 'Specialist not found.');
        }

        $appointments = Appointment::where('specialist_id', $specialist->id)
            ->orderBy('created_at')
            ->orderBy('id')
            ->get()
            ->takeUntil(
                function ($item) use ($appointmentId) {
                    return $item->id >= $appointmentId;
                }
            );

        $firstAppointmentTime = 0;
        $count = count($appointments);

        if ($count !== 0) {
            $first = $appointments->first();

            $startTime = Carbon::parse($first->started_at);
            $finishTime = Carbon::now();

            $firstAppointmentTime = $finishTime->diffInMilliseconds($startTime);
            $firstAppointmentTime = $firstAppointmentTime > $specialist->appointment_time
                ? 0
                : $firstAppointmentTime;
        }

        $totalWaitTime = ($specialist->appointment_time * $count) - $firstAppointmentTime;

        $totalWaitTime = Carbon::now()
            ->addMilliseconds($totalWaitTime)
            ->diffForHumans(
                ['options' => Carbon::JUST_NOW]
            );

        $totalWaitTime = str_replace(" from now", "", $totalWaitTime);

        return ['data' => ['time_left' => $totalWaitTime]];
    }
}
