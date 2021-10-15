import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarHours } from '../../calendar-modal/calendar-hours/calendar-hours';
import { CalendarHoursService } from '../../service/calendar-hours.service';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';
import { CalendarEventService } from '../../service/calendar-event.service';


@Component({
  selector: 'angular-material-calendar-day-view-grid',
  templateUrl: './calendar-day-view-grid.component.html',
  styleUrls: [
    './calendar-day-view-grid.component.scss'
  ]
})
export class CalendarDayViewGridComponent implements OnInit, AfterViewInit {
  @Input() events?: CalendarEventInput[] = []
  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;
  calendarHours?: CalendarHours[][];
  calendarEventsFull?: CalendarEventFull[];

  constructor(
      private scroller: ViewportScroller,
      private store: Store<{ _date: CalendarDate}>,
      private _calendarWeekService: CalendarHoursService,
      private _calendarEventService: CalendarEventService
  ) {
      this.date$ = store.select('_date');
  }
    
    ngOnInit(): void {
      this.date$!.subscribe((d: CalendarDate) => {
        this._currentDate = d;
        this.calendarHours = this._calendarWeekService
                                 .getCalndarDayHoursGridData(this._currentDate!);
        this.calendarEventsFull = this._calendarWeekService
                                 .filterEventsByDateAndStartTime(this.events!, this.calendarHours!);
        this.calendarEventsFull = this._calendarEventService
                                 .filteredConflictedEvents(this.calendarEventsFull);
        });
    }

    ngAfterViewInit() {
      const selectedId = this.calendarHours?.filter
                             ((hours: CalendarHours[]) => hours.filter
                             ((hour: CalendarHours) => hour.isHourNow)[0]);
      document.getElementById(((selectedId![0][0]).hours)!)!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }

    getColspan(d: CalendarHours): number {
      return d.isFirst ? 1 : 7;
  }

    trackByHour(index:number, el:CalendarHours): string {
      return el.hours!;
    }
}