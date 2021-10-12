import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event';

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
    events?: CalendarEventInput[] = [];

    constructor(
        private store: Store<{ _date: CalendarDate}>,
        private _monthViewService: MonthViewService, 
    ) {
      this.date$ = store.select('_date');
    }

    ngOnInit(): void {
      this.date$!.subscribe((d: CalendarDate) => {
        this._currentDate = d;
        this.monthViewDates  = this._monthViewService.getCalendarDateEventMap(d, this.events!);
      });
    }
}