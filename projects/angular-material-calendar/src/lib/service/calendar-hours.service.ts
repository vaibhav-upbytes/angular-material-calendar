import { Injectable } from "@angular/core";
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event-input";
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
        let hours = this._dateService.getHoursFormat().map((d) => {
           return {
               hours: d,
               isHourNow: this._dateService.isHoursNow(d),
               date: 0,
               day: '',
               isAllDay: false
           }
        });
        hours.unshift(this.addAllDayEventRow());
        return hours;
    }

    getCalendarWeekRange(date: CalendarDate): CalendarHours[] {
        const dates: CalendarDate[] = this._dateService.getWeekDatesRange(date);
        return this.pushFirstRowForGrid(dates);
    }

    getCalndarWeekHoursGridData(date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.getCalendarWeekRange(date);
        return this.getCalendarHours().map((c) =>
        dates.map((h) => {
            const ch =  this.createCalendarHours(h, c);
            return ch
        }));
    }

    getCalndarDayHoursGridData(date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.pushFirstRowForGrid(Array.of(date));
        return this.getCalendarHours().map((c) =>
        dates.map((h) => {
            const ch =  this.createCalendarHours(h, c);
            return ch
        }));
    }


    pushFirstRowForGrid(dates: CalendarDate[]): CalendarHours[] {
        const hours: CalendarHours[] = dates.map((d, i) => {
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
            cDate: h.cDate
        };
    }

    filterEventsByDateAndStartTime(
        events: CalendarEventInput[], calendarHours: CalendarHours[][]
        ): CalendarEventFull[] {
            let filteredEvents: CalendarEventFull[] = [];
            calendarHours.forEach((hours: CalendarHours[], i) => {
                hours.forEach((h: CalendarHours, j) => {
                    events.forEach((e: CalendarEventInput) => {
                        if( h.cDate! && this._dateService.isSameDate(h.cDate!, e.start!) && 
                        this._dateService.isSameHour(h.hours!, e.start!)) {
                            let height: number = this._dateService
                                                .timeDiffinMinutes(e.start!, e.end!) / 12;
                            filteredEvents.push(this.createCalendarEventFull(e, i, j, height));
                        }
                    });
                });
            });
            return filteredEvents;
    }

    addAllDayEventRow() {
        return {
            hours: "0",
            isHourNow: false,
            date: 0,
            day: '',
            isAllDay: true
        };
    }

    createCalendarEventFull(final: CalendarEventInput,
        top: number, left: number, height: number): CalendarEventFull {
        return {
            start: final.start ,
            end: final.end,
            title: final.title,
            color: final.color,
            format: final.format,
            left: left,
            top: top,
            height: height,
            width: 1
        };
    }

}