import { Injectable } from "@angular/core";
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { CalendarHours } from "../calendar-modal/calendar-hours/calendar-hours";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class CalendarHoursService {

    constructor(
        private _dateService: DateService
        ) {}

    getCalendarHours(): CalendarHours[] {
        return this._dateService.getHoursFormat().map((d) => {
           return {
               hours: d,
               isSelected: this._dateService.isHours(d),
               date: 0,
               day: ''
           }
        });
    }

    getCalendarWeekRange(date: CalendarDate): CalendarDate[] {
        return this._dateService.getWeekDatesRange(date);
    }

    getCalndarHoursGridData(date: CalendarDate): CalendarHours[][] {
        const dates: CalendarDate[] = this.getCalendarWeekRange(date);
        this.pushAHourForGrid(dates);
        return this.getCalendarHours().map((c) =>
        dates.map((h) =>{
            return {
                hours: c.hours,
                day: this._dateService.getDayName(h, 'short'),
                date: this._dateService.getDate(h),
                isSelected: c.isSelected
            }
        }));
    }

    pushAHourForGrid(dates: CalendarDate[]) {
         dates.unshift(dates[0]);
    }
}