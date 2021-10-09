import { Component } from '@angular/core';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: [
    './calendar-day-view.component.scss'
  ]
})
export class CalendarDayViewComponent {
    constructor(private c: CalendarHoursService) {}
}