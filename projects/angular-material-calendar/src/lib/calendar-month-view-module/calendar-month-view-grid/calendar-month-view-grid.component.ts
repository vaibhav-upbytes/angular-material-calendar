import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable } from 'rxjs';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { goto } from '../../store/actions/date.action';
import { day } from '../../store/actions/calendar-view.action';
import { selectCalendarDateState } from '../../store';

/**
 * @author vaibhav
 *
 * CalendarMonthViewGridComponent: this component will display grid view of month dates
 * Events: events will be merge with calendar dates and display by
 * using calendar view dates template.
 */

@Component({
  selector: 'upbytes-angular-material-calendar-month-view-grid',
  templateUrl: './calendar-month-view-grid.component.html',
  styleUrls: [
    './calendar-month-view-grid.component.scss'
  ]
})
export class CalendarMonthViewGridComponent implements OnInit {
  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;
  monthViewDates?: Map<CalendarMonthView, CalendarEventInput[]>;
  @Input()
  events$?: Observable<CalendarEventInput[]>;

  constructor(
    private store: Store<{ _date: CalendarDate }>,
    private _monthViewService: MonthViewService,
  ) {
    this.date$ = store.select(selectCalendarDateState);
  }

  /**
   * This function will combine date stream with event stream to intialize grid view.
   */
  ngOnInit(): void {

    this.date$?.pipe(
      combineLatestWith(this.events$!),
      map(([date, events]) => {
        this._currentDate = date;
        return this._monthViewService.getCalendarDateEventMap(date, events);
      }),
    ).subscribe(data => this.monthViewDates = data);
  }

  /**
   * This function will return true if array have more than 2 events.
   * used to display event count
   * @param events calendar event input array as a parameter
   * @returns return boolean value is array has more than 2 events.
   */
  isCountVisible(events: CalendarEventInput[]): boolean {
    return events.length > 2;
  }

  /**
   * This function is used with user click on date value.
   * it will switch month view to day view.
   * @param e will take current calendar state as a input.
   */
  switchView(e: CalendarMonthView) {
    this.goto(this._monthViewService.setDate(e, this._currentDate!));
    this.store.dispatch(day());
  }

  /**
   * This fucntion is use to dispatch date to store.
   * @param _currentDate take current date as a input paramater
   */
  goto(_currentDate: CalendarDate) {
    this.store.dispatch(goto(_currentDate));
  }

}
