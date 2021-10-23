import { Component, Input } from '@angular/core';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';

import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { MonthViewService } from '../../calendar-month-view-module/service/calendar-month-view.service';
import { CalendarEventService } from '../../service/calendar-event.service';

@Component({
  selector: 'angular-material-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: [
    './calendar-event-view.component.scss'
  ]
})
export class CalendarEventViewComponent {
    @Input() events?: CalendarEventInput[];
    time?: string;

    constructor(private monthViewService: MonthViewService,
      private calendarEventService: CalendarEventService) { }

    getDisplay(tile: CalendarEventInput): string {
      return this.monthViewService.getEventDisplay(tile);
    }

    getTitle(e: CalendarEventFull): string {
      return this.time = this.calendarEventService.eventsubtitle(e);
    }
}