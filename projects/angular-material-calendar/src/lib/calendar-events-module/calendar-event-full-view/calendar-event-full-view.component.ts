import { Component, Input } from '@angular/core';

import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-event-full-view',
  templateUrl: './calendar-event-full-view.component.html',
  styleUrls: [
    './calendar-event-full-view.component.scss'
  ]
})
export class CalendarEventFullViewComponent {
    @Input() events?: CalendarEventInput[]
    constructor(private calendarHoursService: CalendarHoursService) {}
}