import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';

import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { MonthViewService } from '../../calendar-month-view-module/service/calendar-month-view.service';
import { CalendarEventDialogeService } from '../../service/calendar-event-dialog.service';
import { CalendarEventService } from '../../service/calendar-event.service';

@Component({
  selector: 'upbytes-angular-material-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: [
    './calendar-event-view.component.scss'
  ]
})
export class CalendarEventViewComponent {
  @ViewChild('eventView', { read: ElementRef }) public eventViewRef?: ElementRef
  @Input() events?: CalendarEventInput[];
  time?: string;

  constructor(
    private monthViewService: MonthViewService,
    private calendarEventService: CalendarEventService,
    private calendarEventDialogService: CalendarEventDialogeService) { }

  getDisplay(tile: CalendarEventInput): string {
    return this.monthViewService.getEventDisplay(tile);
  }

  getTitle(e: CalendarEventFull): string {
    return this.time = this.calendarEventService.eventsubtitle(e);
  }

  openEventDialog(e: CalendarEventFull) {
    this.calendarEventDialogService.openDialog({
      edata: e,
      positionRelativeToElement: this.eventViewRef!,
      hasBackdrop: true,
      backdropClass: 'calendar-event-dialog-white-backdrop',
      panelClass: 'calendar-event-dialog'
    });
  }
}