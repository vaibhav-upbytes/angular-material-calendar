import { Component, AfterViewInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarHours } from '../../calendar-modal/calendar-hours/calendar-hours';
import { CalendarHoursService } from '../../service/calendar-hours.service';


@Component({
  selector: 'angular-material-calendar-week-view-grid',
  templateUrl: './calendar-week-view-grid.component.html',
  styleUrls: [
    './calendar-week-view-grid.component.scss'
  ]
})
export class CalendarWeekViewGridComponent implements AfterViewInit {

  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;
  calendarHours?: CalendarHours[][];

    constructor(
      private scroller: ViewportScroller,
      private store: Store<{ _date: CalendarDate}>,
      private _calendarWeekService: CalendarHoursService
    ) {
      this.date$ = store.select('_date');
      this.date$.subscribe((d: CalendarDate) => {
          this._currentDate = d;
          this.calendarHours = this._calendarWeekService
                                   .getCalndarHoursGridData(this._currentDate!);
          });
    }

    ngAfterViewInit() {
      const selectedId = this.calendarHours?.filter
                             ((hours: CalendarHours[]) => hours.filter
                             ((hour: CalendarHours) => hour.isHourNow)[0]);
      document.getElementById(((selectedId![0][0]).hours)!)!.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }

    trackByHour(index:number, el:CalendarHours): string {
      return el.hours!;
    }
}