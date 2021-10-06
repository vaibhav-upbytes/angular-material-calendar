import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MonthViewService } from '../service/calendar-month-view.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';

@Component({
  selector: 'angular-material-calendar-month-view-grid',
  templateUrl: './calendar-month-view-grid.component.html',
  styleUrls: [
    './calendar-month-view-grid.component.scss'
  ]
})
export class CalendarMonthViewGridComponent {
    date$?: Observable<CalendarDate>;
    _currentDate?: CalendarDate;
    monthViewDates?: CalendarMonthView[];

    constructor(
        private store: Store<{ _date: CalendarDate}>,
        private _monthViewService: MonthViewService, 
    ) {
        this.date$ = store.select('_date');
        this.date$.subscribe((d: CalendarDate) => {
            this._currentDate = d;
            this.monthViewDates = this._monthViewService.getMonthViewDates(this._currentDate!);
        });
    }
}