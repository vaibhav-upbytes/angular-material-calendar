import { Component, AfterViewInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarHours } from '../../calendar-modal/calendar-hours/calendar-hours';
import { CalendarHoursService } from '../../service/calendar-hours.service';


@Component({
  selector: 'angular-material-calendar-day-view-grid',
  templateUrl: './calendar-day-view-grid.component.html',
  styleUrls: [
    './calendar-day-view-grid.component.scss'
  ]
})
export class CalendarDayViewGridComponent implements AfterViewInit {

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
                                   .getCalndarDayHoursGridData(this._currentDate!);
          });
    }

    ngAfterViewInit() {
      const selectedId = this.calendarHours?.filter
                             ((hours: CalendarHours[]) => hours.filter
                             ((hour: CalendarHours) => hour.isHourNow)[0]);
      document.getElementById(((selectedId![0][0]).hours)!)!.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }

    getColspan(d: CalendarHours): number {
      return d.isFirst ? 1 : 7;
  }

    trackByHour(index:number, el:CalendarHours): string {
      return el.hours!;
    }
}