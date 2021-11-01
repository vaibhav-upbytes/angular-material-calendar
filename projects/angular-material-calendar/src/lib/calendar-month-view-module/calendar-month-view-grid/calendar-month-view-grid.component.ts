import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable } from 'rxjs';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { goto } from '../../actions/date.action';
import { day } from '../../actions/calendar-view.action';
type d = [CalendarDate, CalendarEventInput[]];

@Component({
  selector: 'angular-material-calendar-month-view-grid',
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
    this.date$ = store.select('_date');
  }

  ngOnInit(): void {

    this.date$?.pipe(
      combineLatestWith(this.events$!),
      map(([date, events]) => {
        this._currentDate = date;
        return this._monthViewService.getCalendarDateEventMap(date, events);
      }),
    ).subscribe(data => this.monthViewDates = data);
  }

  isCountVisible(events: CalendarEventInput[]): boolean {
    return events.length > 2;
  }

  switchView(e: CalendarMonthView) {
    this.goto(this._monthViewService.setDate(e, this._currentDate!));
    this.store.dispatch(day());
  }

  goto(_currentDate: CalendarDate) {
    this.store.dispatch(goto(_currentDate));
  }

}