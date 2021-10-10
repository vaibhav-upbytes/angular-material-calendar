import { Component } from '@angular/core';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: [
    './calendar-event-view.component.scss'
  ]
})
export class CalendarEventViewComponent {
    constructor(private c: CalendarHoursService) {}
}