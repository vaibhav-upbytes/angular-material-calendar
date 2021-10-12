import { Component, Input } from '@angular/core';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: [
    './calendar-day-view.component.scss'
  ]
})
export class CalendarDayViewComponent {
    @Input() events?: CalendarEventInput[] = []
    constructor(private c: CalendarHoursService) {}
}