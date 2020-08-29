<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\BareAppointmentResource;
use App\User;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request, $specialistId)
    {
        if (!User::find($specialistId)) {
            abort(404, 'Specialist not found.');
        }

        if (!Appointment::where('specialist_id', $specialistId)->exists()) {
            return BareAppointmentResource::collection([]);
        }

        $appointments = Appointment::where('specialist_id', $specialistId)
            ->orderBy('created_at')
            ->orderBy('id');

        $active = filter_var(
            $request->query('active'),
            FILTER_VALIDATE_BOOLEAN,
            FILTER_NULL_ON_FAILURE
        );
        if ($request->query('active') !== null && $active !== null) {
            $appointments = $appointments->where('active', $active);
        }

        $limit = $request->query('limit');
        $limit = is_numeric($limit) ? (int) $limit : null;
        if ($limit !== null) {
            $appointments = $appointments->take($limit);
        }

        return BareAppointmentResource::collection($appointments->get());
    }

    public function store($specialistId)
    {
        if (!User::find($specialistId)) {
            abort(404, 'Specialist not found.');
        }

        $appointment = factory(Appointment::class)
            ->create(['specialist_id' => $specialistId]);
        $appointment->save();

        return new AppointmentResource($appointment);
    }

    public function show($id)
    {
        $appointment = Appointment::find($id)
            ?? abort(404, 'Appointment does not exist.');

        return new AppointmentResource($appointment);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);

        if ($appointment === null) {
            abort(404, 'Appointment not found.');
        }

        $request->validate(
            [
                'active' => 'required|boolean',
                ['required' => 'The :attribute field is required.']
            ]
        );

        $active = (bool) $request->input('active');

        if ($active && Appointment::where('active', true)->exists()) {
            abort(403, 'There cannot be more than one active appointment.');
        }

        $appointment->active = $active;
        if ($active) {
            $appointment->started_at = now();
        }
        $appointment->save();

        return new AppointmentResource($appointment);
    }

    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if ($appointment === null) {
            abort(404, 'Appointment not found.');
        }

        $appointment->delete();

        return response()->json(null, 204);
    }
}
