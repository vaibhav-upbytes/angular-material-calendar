import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DateService } from '../../service/date.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';

/**
 * @author vaibhav
 * calendar day view header comoponent should be displayed date/weekdaylong and GTM +timezone
 */
@Component({
  selector: 'upbytes-angular-material-calendar-day-view-header',
  templateUrl: './calendar-day-view-header.component.html',
  styleUrls: [
    './calendar-day-view-header.component.scss'
  ]
})
export class CalendarDayViewHeaderComponent {

  currentdate$?: Observable<CalendarDate>;
  day?: string;
  date?: number;
  timeZone?: string;
    constructor(
      private store: Store<{ _date: CalendarDate}>,
      private _dateService: DateService
    ) {
      this.currentdate$ = store.select('_date');
      this.currentdate$.subscribe((d: CalendarDate) => {
          let redate = this._dateService.restoreFromStore(d);
          this.day = redate.current.weekdayLong;
          this.date = redate.current.day;
          this.timeZone = this._dateService.getTimeZoneFormat(d);
      });
    }
}