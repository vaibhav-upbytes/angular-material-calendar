import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';
//import {DomSanitizationService} from '@angular/platform-browser';
//import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { CalendarHoursService } from '../../service/calendar-hours.service';

@Component({
  selector: 'angular-material-calendar-event-full-view',
  templateUrl: './calendar-event-full-view.component.html',
  styleUrls: [
    './calendar-event-full-view.component.scss'
  ]
})
export class CalendarEventFullViewComponent implements OnInit {
    @Input() event?: CalendarEventFull;
    constructor(
      private _element: ElementRef<HTMLElement>,
      private calendarHoursService: CalendarHoursService) {

      }
  ngOnInit(): void {
    this._setStyle('left', `calc((12.5% - 0px + 0px) * ${this.event?.left})`);
    this._setStyle('top', `calc((5em + 0px) * ${this.event?.top})`);
    this._setStyle('width', `calc((12.5% - 0px) * 1 + 0px)`);
    this._setStyle('height', `calc(5em + 0px)`);
  }
    
    _setStyle(property: string, value: any): void {
        (this._element.nativeElement.style as any)[property] = value;
    }
}