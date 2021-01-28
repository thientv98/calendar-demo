import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // webpack uses file-loader to handle font files
import './main.css'; // our app's CSS

document.addEventListener('DOMContentLoaded', function () {

  // initialize the external events
  let draggableEl = document.getElementById('mydraggable');
  let checkbox = document.getElementById('drop-remove');

  new Draggable(draggableEl, {
    itemSelector: '.fc-event',
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        duration: '01:00'
      };
    }
  });

  // initialize the calendar
  var calendarEl = document.getElementById('calendar');
  var calendar = new Calendar(calendarEl, {
    plugins: [resourceTimeGridPlugin, interactionPlugin, bootstrapPlugin],
    // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: 'resourceTimeGridDay',
    themeSystem: 'bootstrap',
    dayCount: 4,
    resources: [
      {
        id: 'A',
        title: 'Resource A'
      },
      {
        id: 'B',
        title: 'Resource B'
      },
      {
        id: 'C',
        title: 'Resource C',
      }
    ],
    customButtons: {
      yesterday: {
        text: 'yesterday',
        click: function () {
          // console.log(calendar.getFullYear());
          calendar.incrementDate({ day: -1 })
        }
      }
    },
    headerToolbar: {
      left: 'prev',
      center: 'yesterday title',
      right: 'next'
    },
    initialDate: '2018-01-01',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    droppable: true,
    editable: true,
    eventOverlap: function (stillEvent, movingEvent) {
      return stillEvent.allDay && movingEvent.allDay;
    },
    events: [
      {
        title: 'Event 1',
        start: '2018-01-01T00:30:00',
        end: '2018-01-01T01:30:00',
        resourceId: 'A',
        // allDay: false,
      },
      {
        title: 'Event 2',
        start: '2018-01-01T20:30:00',
        end: '2018-01-01T23:30:00',
        resourceId: 'A',
      },
      {
        title: 'event3',
        start: '2018-01-01T17:30:00',
        end: '2018-01-01T19:30:00',
        resourceId: 'A',
        allDay: false // will make the time show
      },
      {
        title: 'Meeting',
        start: '2018-01-01T10:30:00',
        end: '2018-01-01T12:30:00',
        resourceId: 'B',
      }
    ],
    drop: function (info) {
      // is the "remove after drop" checkbox checked?
      if (checkbox.checked) {
        // if so, remove the element from the "Draggable Events" list
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    }
  });

  calendar.render();
});
