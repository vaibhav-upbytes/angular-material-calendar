import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { combineAll, switchMap } from 'rxjs/operators';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { goto } from '../../actions/date.action';
import { day } from '../../actions/calendar-view.action';
import { map } from 'rxjs/operators';

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
    // this.date$!.subscribe((d: CalendarDate) => {
    //   this._currentDate = d;
    //   this.monthViewDates = this._monthViewService.getCalendarDateEventMap(d, this.events!);
    // });
    // const orderedData = combineLatest([this.date$, this.events$]).pipe(
    //   map(([d, e]) => this._monthViewService.getCalendarDateEventMap(d, e)),
    // );
    this.date$!.pipe(
      switchMap(this.events$!, (d: CalendarDate, e: CalendarEventInput[]) => {
        this.events$?.pipe(
          map((e: CalendarEventInput[]) => {
            this._currentDate = d;
            return this._monthViewService.getCalendarDateEventMap(d, e);
          })
        )

      }),
    );
    // data.pipe()
    //   .subscribe(x => {

    //     this.monthViewDates = x;
    //   });
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