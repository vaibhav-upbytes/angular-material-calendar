import { Injectable } from "@angular/core";
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event";
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

    getCalndarWeekHoursGridData(events: CalendarEventInput[], date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.getCalendarWeekRange(date);
        return this.getCalendarHours().map((c) =>
        dates.map((h) => {
            const ch =  this.createCalendarHours(h, c);
            const e = this.filterEventsByDateAndStartTime(events, ch);
            ch.events = e;
            return ch
        }));
    }

    getCalndarDayHoursGridData(events: CalendarEventInput[], date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.pushFirstRowForGrid(Array.of(date));
        return this.getCalendarHours().map((c) =>
        dates.map((h) => {
            const ch =  this.createCalendarHours(h, c);
            const e = this.filterEventsByDateAndStartTime(events, ch);
            ch.events = e;
            return ch
        }));
    }


    pushFirstRowForGrid(dates: CalendarDate[]): CalendarHours[] {
        const hours: CalendarHours[] = dates.map((d) => {
            return {
                day: this._dateService.getDayName(d, 'short'),
                date: this._dateService.getDate(d),
                isToday: this._dateService.isToday(d),
                month: this._dateService.getMonth(d),
                year: this._dateService.getYear(d),
                cDate: d
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

    createCalendarHours(h: CalendarHours, c: CalendarHours): CalendarHours {
        return {
            hours: c.hours,
            day: h.day,
            date: h.date,
            isHourNow: c.isHourNow,
            isToday: h.isToday,
            timeZone: h.timeZone,
            isFirst: h.isFirst,
            cDate: h.cDate,
            events: []
        };
    }

    filterEventsByDateAndStartTime(
        events: CalendarEventInput[], h: CalendarHours
        ): CalendarEventInput[] {
            return events.filter((e: CalendarEventInput) => h.cDate! && this._dateService.isSameDate(h.cDate!, e.start!) && 
            this._dateService.isSameHour(h.hours!, e.start!));
    }
}