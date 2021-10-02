import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-date/calendar-date';
import * as moment from 'moment';
import { CalendarMonthView } from '../calendar-month-view';

@Component({
  selector: 'angular-material-calendar-month-view',
  templateUrl: './calendar-month-view.component.html',
  styleUrls: [
    './calendar-month-view.component.scss'
  ]
})
export class CalendarMonthViewComponent {
    date$?: Observable<CalendarDate>;
    _currentDate?: CalendarDate;
    monthViewDates?: CalendarMonthView[];
    dayOfWeekNames?: string[];

    constructor(
        private store: Store<{ _date: CalendarDate}>,
        private _monthViewService: MonthViewService, 
    ) {
        this.date$ = store.select('_date');
        this.date$.subscribe((d: CalendarDate) => {
            this._currentDate = d;
            this.monthViewDates = this._monthViewService.getMonthViewDates(this._currentDate!);
            console.log(this.monthViewDates);
        });
        this.dayOfWeekNames = this._monthViewService.getDayOfWeeksNames('short');
    }
}