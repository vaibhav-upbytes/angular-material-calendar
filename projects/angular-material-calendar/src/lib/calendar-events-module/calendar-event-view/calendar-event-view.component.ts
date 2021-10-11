import { Component, Input } from '@angular/core';

import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event';
import { MonthViewService } from '../../calendar-month-view-module/service/calendar-month-view.service';

@Component({
  selector: 'angular-material-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: [
    './calendar-event-view.component.scss'
  ]
})
export class CalendarEventViewComponent {
    @Input() events?: CalendarEventInput[]
    constructor(private monthViewService: MonthViewService) {}

    getDisplay(tile: CalendarEventInput): string {
      return this.monthViewService.getEventDisplay(tile);
    }
}