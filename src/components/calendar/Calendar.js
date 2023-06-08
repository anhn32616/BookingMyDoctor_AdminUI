import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";



export default function Calendar(events) {
    return (
        <div className="CalendarTest">
            {console.log(events)}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                initialView='timeGridWeek'
                events={events}
            />
        </div>
    );
}
