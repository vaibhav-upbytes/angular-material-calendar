import { Injectable } from "@angular/core";
import { DateService } from "../../service/date.service";
import { CalendarDate } from "../../calendar-date/calendar-date";
import { CalendarMonthView } from "../calendar-month-view";

@Injectable({
    providedIn: 'root'
})
export class MonthViewService {

    constructor(
        private _dateService: DateService
        ) {}

    getMonthViewDates(date: CalendarDate): CalendarMonthView [] {
        let d = date;
        let monthDates: CalendarDate[] = this._dateService.getMonthDatesRange(d);
        return monthDates.map((d) => {
            return { date: this._dateService.getDate(d),
                     day: this._dateService.getDayName(d, 'short'),
                     isEnable: this._dateService.getMonth(date) == this._dateService.getMonth(d)
                }
        });
    }

    // need to be fixed to get first day as a monday always
    getDayOfWeeksNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this._dateService.getDayOfWeekNamesFromMonday(style);
    }
}