<?php

namespace App\Http\Resources;

use Illuminate\Support\Arr;

class BareAppointmentResource extends AppointmentResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return Arr::except(
            parent::toArray($request),
            ['specialist']
        );
    }
}
