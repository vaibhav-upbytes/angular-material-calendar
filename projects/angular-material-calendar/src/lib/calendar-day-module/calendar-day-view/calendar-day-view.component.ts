import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';

@Component({
  selector: 'upbytes-angular-material-calendar-day-view',
  templateUrl: './calendar-day-view.component.html',
  styleUrls: [
    './calendar-day-view.component.scss'
  ]
})
export class CalendarDayViewComponent {
    @Input() events$?: Observable<CalendarEventInput[]>;
    constructor() {}
}
