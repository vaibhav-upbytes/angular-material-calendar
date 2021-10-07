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
               isHourNow: this._dateService.isHoursNow(d),
               date: 0,
               day: ''
           }
        });
    }

    getCalendarWeekRange(date: CalendarDate): CalendarHours[] {
        const dates: CalendarDate[] = this._dateService.getWeekDatesRange(date);
        return this.pushFirstRowForGrid(dates);
        }

    getCalndarHoursGridData(date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.getCalendarWeekRange(date);
        return this.getCalendarHours().map((c) =>
        dates.map((h) =>{
            return {
                hours: c.hours,
                day: h.day,
                date: h.date,
                isHourNow: c.isHourNow,
                isToday: h.isToday,
                timezone: h.timeZone,
                isFirst: h.isFirst
            };
        }));
    }

    pushFirstRowForGrid(dates: CalendarDate[]): CalendarHours[] {
        const hours: CalendarHours[] = dates.map((d) => {
            return {
                day: this._dateService.getDayName(d, 'short'),
                date: this._dateService.getDate(d),
                isToday: this._dateService.isToday(d)
            };
        });
        hours.unshift(this.createFirstRowDate(dates[0]));
        return hours
    }

    createFirstRowDate(date: CalendarDate): CalendarHours {
        return {
            timeZone: this._dateService.getTimeZoneFormat(date),
            isFirst: true
        };
    }
}