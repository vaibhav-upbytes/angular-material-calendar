import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';
import { CalendarEventService } from '../../service/calendar-event.service';

const LEFT = "12.7%";
const TOP = "5em";
const WIDTH = "11%";
const HEIGHT = "5em";

@Component({
  selector: 'angular-material-calendar-event-full-view',
  templateUrl: './calendar-event-full-view.component.html',
  styleUrls: [
    './calendar-event-full-view.component.scss'
  ]
})
export class CalendarEventFullViewComponent implements OnInit {
    @Input() event?: CalendarEventFull;
    time?: string;
    constructor(
      private _element: ElementRef<HTMLElement>,
      private calendarEventService: CalendarEventService) {

    }
    
    ngOnInit(): void {
      this.calendarEventService.setEventStyle(this.event!,
      this._element, LEFT, TOP, WIDTH, HEIGHT);
      this.time = this.calendarEventService.eventsubtitle(this.event!);
    }

}