import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatestWith } from 'rxjs';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarHours } from '../../calendar-modal/calendar-hours/calendar-hours';
import { CalendarHoursService } from '../../service/calendar-hours.service';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { CalendarEventFull } from '../../calendar-modal/calendar-event/calendar-event-full';
import { CalendarEventService } from '../../service/calendar-event.service';
import { selectCalendarDateState } from '../../store';


/**
 * @author vaibhav
 * calendar week view gird component will display grid view of week date and time.
 *
 */
@Component({
  selector: 'upbytes-angular-material-calendar-week-view-grid',
  templateUrl: './calendar-week-view-grid.component.html',
  styleUrls: [
    './calendar-week-view-grid.component.scss'
  ]
})
export class CalendarWeekViewGridComponent implements OnInit, AfterViewInit {
  @Input() events$?: Observable<CalendarEventInput[]>;
  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;
  calendarHours?: CalendarHours[][];
  calendarEventsFull?: CalendarEventFull[];
  multipleDayEvents?: CalendarEventFull[];

  constructor(
    private store: Store<{ _date: CalendarDate }>,
    private _calendarWeekService: CalendarHoursService,
    private _calendarEventService: CalendarEventService
  ) {
    this.date$ = store.select(selectCalendarDateState);

  }

  /**
   * Component lifecycle ngOnInit will initialize view
   */
  ngOnInit(): void {
    this.date$?.pipe(
      combineLatestWith(this.events$!)
    ).subscribe(([d, events]: [CalendarDate, CalendarEventInput[]]) => {
      this._currentDate = d;
      this.calendarHours = this._calendarWeekService
        .getCalndarWeekHoursGridData(this._currentDate!);
      const filteredEventsArr = this._calendarWeekService.filterMultipleDayEvents(events!);
      this.multipleDayEvents = this._calendarWeekService
        .findLeftForMultiDaysEventWeek(filteredEventsArr[0], this._currentDate!);
      this.calendarEventsFull = this._calendarWeekService
        .filterEventsByDateAndStartTime(filteredEventsArr[1], this.calendarHours!);
      this.calendarEventsFull = this._calendarEventService
        .filteredConflictedEvents(this.calendarEventsFull, 1);
    });
  }

  /**
   * component lifecycle hook will scroll view to current hour.
   */
  ngAfterViewInit() {
    document.getElementById(`week-hour-indicator`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  trackByHour(index: number, el: CalendarHours): string {
    return el.hours!;
  }
}
