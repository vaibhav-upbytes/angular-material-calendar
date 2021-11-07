import { Component } from '@angular/core';
import { MonthViewService } from '../service/calendar-month-view.service';

/**
 * @author vaibhav
 * calendar month view grid header component will display short weekday name 
 */

@Component({
  selector: 'upbytes-angular-material-calendar-month-view-grid-header',
  templateUrl: './calendar-month-view-grid-header.component.html',
  styleUrls: [
    './calendar-month-view-grid-header.component.scss'
  ]
})
export class CalendarMonthViewGridHeaderComponent {
    dayOfWeekNames?: string[];

    constructor(
        private _monthViewService: MonthViewService, 
    ) {
        this.dayOfWeekNames = this._monthViewService.getDayOfWeeksNames('short');
    }

}