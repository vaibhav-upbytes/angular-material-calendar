import { Component, Input } from '@angular/core';

import { CalendarEventInput } from '../../../calendar-modal/calendar-event/calendar-event';
import { CalendarHoursService } from '../../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-event-week-view',
  templateUrl: './calendar-event-week-view.component.html',
  styleUrls: [
    './calendar-event-week-view.component.scss'
  ]
})
export class CalendarEventWeekViewComponent {
    @Input() events?: CalendarEventInput[]
    constructor(private calendarHoursService: CalendarHoursService) {}
}