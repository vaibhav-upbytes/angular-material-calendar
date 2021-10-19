import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DateService } from '../../service/date.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';

@Component({
  selector: 'angular-material-calendar-day-view-header',
  templateUrl: './calendar-day-view-header.component.html',
  styleUrls: [
    './calendar-day-view-header.component.scss'
  ]
})
export class CalendarDayViewHeaderComponent {

  date$?: Observable<CalendarDate>;
  dayheader?: String;
  timeZone?: string;
    constructor(
      private store: Store<{ _date: CalendarDate}>,
      private _dateService: DateService
    ) {
      this.date$ = store.select('_date');
      this.date$.subscribe((d: CalendarDate) => {
          let date = this._dateService.restoreFromStore(d);
          this.dayheader = date.current.toFormat("ccc d");
          this.timeZone = this._dateService.getTimeZoneFormat(d);
      });
    }
}