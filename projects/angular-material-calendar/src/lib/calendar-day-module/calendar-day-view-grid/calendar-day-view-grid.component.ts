import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatestWith } from 'rxjs';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarHours } from '../../calendar-modal/calendar-hours/calendar-hours';
import { CalendarHoursService } from '../../service/calendar-hours.service';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';
import { CalendarEventService } from '../../service/calendar-event.service';
import { DateService } from '../../service/date.service';

/**
 * @author vaibhav
 * calendar day view gird component will display grid view of selected date and time.
 * 
 */
@Component({
  selector: 'upbytes-angular-material-calendar-day-view-grid',
  templateUrl: './calendar-day-view-grid.component.html',
  styleUrls: [
    './calendar-day-view-grid.component.scss'
  ]
})
export class CalendarDayViewGridComponent implements OnInit, AfterViewInit {
  @Input() events$?: Observable<CalendarEventInput[]>;
  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;
  calendarHours?: CalendarHours[][];
  calendarEventsFull?: CalendarEventFull[];
  multipleDayEvents?: CalendarEventFull[];

  constructor(
    private store: Store<{ _date: CalendarDate }>,
    private _calendarWeekService: CalendarHoursService,
    private _calendarEventService: CalendarEventService,
    private _dateService: DateService
  ) {
    this.date$ = store.select('_date');
  }

  ngOnInit(): void {
    this.date$!.pipe(
      combineLatestWith(this.events$!)
    ).subscribe(([d, events]: [CalendarDate, CalendarEventInput[]]) => {
      this._currentDate = d;
      this.calendarHours = this._calendarWeekService
        .getCalndarDayHoursGridData(this._dateService.restoreFromStore(d));
      let filteredEventsArr = this._calendarWeekService.filterMultipleDayEvents(events);
      this.multipleDayEvents = this._calendarWeekService
        .findLeftForMultiDaysEventDay(filteredEventsArr[0], this._dateService.restoreFromStore(d));
      this.calendarEventsFull = this._calendarWeekService
        .filterEventsByDateAndStartTime(filteredEventsArr[1], this.calendarHours!);
      this.calendarEventsFull = this._calendarEventService
        .filteredConflictedEvents(this.calendarEventsFull, 7);
    });
  }

  /**
   * component lifecycle hook will scroll view to current hour.
   */
  ngAfterViewInit() {
    document.getElementById(`day-hour-indicator`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  }

  getColspan(d: CalendarHours): number {
    return d.isFirst ? 1 : 7;
  }

  trackByHour(index: number, el: CalendarHours): string {
    return el.hours!;
  }
}