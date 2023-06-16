import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import './Calendar.css';




export default function Calendar({events, handleClickEvent}) {
    const eventClassNames = (info) => {
        const eventStatus = info.event.extendedProps.status;
        let className = 'event-default';

        switch (eventStatus) {
            case 'Pending':
                className = 'event-pending';
                break;
            case 'Available':
                className = 'event-available';
                break;
            case 'Booked':
                className = 'event-booked';
                break;
            default:
                className = 'event-default';
        }
        return className;
    };
    return (
        <div className="Calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                events={events}
                displayEventEnd
                eventClassNames={eventClassNames}
                eventClick={(e) => {handleClickEvent(e?.event?._def?.extendedProps?.scheduleId)}}
            
            />
        </div>
    );
}
