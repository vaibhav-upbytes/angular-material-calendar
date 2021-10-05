import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarDate } from '../../../calendar-date/calendar-date';
import { DateService } from '../../../service/date.service';

@Component({
    selector: 'angular-material-calendar-label',
    templateUrl: './calendar-label.component.html',
  })
export class CalendarHeaderLabelComponent {
    date$?: Observable<CalendarDate>;
    _currentDate?: CalendarDate;
  
    constructor(private store: Store<{ _date: CalendarDate}>,
                private _dateService: DateService) {
      this.date$ = store.select('_date');
      this.date$.subscribe((d: CalendarDate) => this._currentDate = d);
    }

    get month(): string {
        return this._dateService.getMonthNames(this._currentDate!, 'long');
    }
  
    get year(): string {
        return this._dateService.getYearName(this._currentDate!, 'long');
    }

    get label(): string {
        return `${this.month} ${this.year}`;
    }

}