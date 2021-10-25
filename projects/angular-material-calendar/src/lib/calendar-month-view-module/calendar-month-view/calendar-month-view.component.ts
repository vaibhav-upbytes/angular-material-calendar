import { Component, Input } from '@angular/core';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';

@Component({
  selector: 'angular-material-calendar-month-view',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: [
    './calendar-month-view.component.scss'
  ]
})
export class CalendarMonthViewComponent {
  @Input()
  events?: CalendarEventInput[] = [];
}