import { Component, Input } from '@angular/core';
import { CalendarHoursService } from '../../service/calendar-hours.service';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
@Component({
  selector: 'angular-material-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: [
    './calendar-week-view.component.scss'
  ]
})
export class CalendarWeekViewComponent {
    @Input()
    events?: CalendarEventInput[] = [];
    constructor(private c: CalendarHoursService) {}
}