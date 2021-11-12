import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarDate } from '../../../calendar-modal/calendar-date/calendar-date';
import { DateService } from '../../../service/date.service';
import { CalendarViewPortService } from '../../../service/calendar-view-port.service';

/**
 * @author vaibhav
 * The calendar header label component display month name and year. 
 */

@Component({
    selector: 'upbytes-angular-material-calendar-label',
    templateUrl: './calendar-label.component.html',
})
export class CalendarHeaderLabelComponent {
    date$?: Observable<CalendarDate>;
    _currentDate?: CalendarDate;
    viewport?: string;
  
    constructor(
        private store: Store<{ _date: CalendarDate}>,
        private calendarViewPortService: CalendarViewPortService,
        private _dateService: DateService) {
      this.date$ = store.select('_date');
      this.date$.subscribe((d: CalendarDate) => this._currentDate = d);
      this.calendarViewPortService.viewport.subscribe(s => this.viewport = s);
    }

    /**
     * @returns month long name
     */
    get month(): string {
        return this.size ? 
        this._dateService.getMonthNames(this._currentDate!, 'long')
        : this._dateService.getMonthNames(this._currentDate!, 'short');
    }

    /**
     * @returns year long name 
     */
    get year(): string {
        return this._dateService.getYearName(this._currentDate!, 'long');
    }

    /**
     * @returns month and year label
     */
    get label(): string {
        return `${this.month} ${this.year}`;
    }

    /**
     * invoke when size of view port change
     * @returns boolean false in case of screen small
     */
    get size(): boolean {
        return this.viewport !== 'Small' && this.viewport !== 'XSmall';
    }

}