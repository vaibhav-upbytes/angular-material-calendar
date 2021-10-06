import { Component } from '@angular/core';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: [
    './calendar-week-view.component.scss'
  ]
})
export class CalendarWeekViewComponent {
    constructor(private c: CalendarHoursService) {}
}