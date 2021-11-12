import { Injectable } from "@angular/core";
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event-input";
import { CalendarHours } from "../calendar-modal/calendar-hours/calendar-hours";
import { CalendarEventService } from "./calendar-event.service";
import { DateService } from "./date.service";

export function bifilter<C>(f: (c: C) => boolean, xs: any): [C[], C[]] {
    return xs.reduce(([T, F]: [C[], C[]], e: C) =>
        !f(e) ? [T, [...F, e]] : [[...T, e], F], [[], []]);
}

/**
 * @author vaibhav
 * used by day/week view to create grid data.
 */
@Injectable({
    providedIn: 'root'
})
export class CalendarHoursService {

    constructor(
        private _dateService: DateService,
        private _calendarEventService: CalendarEventService
    ) { }

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
                const ch = this.createCalendarHours(h, c);
                return ch
            }));
    }

    getCalndarDayHoursGridData(date: CalendarDate): CalendarHours[][] {
        const dates: CalendarHours[] = this.pushFirstRowForGrid(Array.of(date));
        return this.getCalendarHours().map((c) =>
            dates.map((h) => {
                const ch = this.createCalendarHours(h, c);
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
                    if (h.cDate! && this._dateService.isSameDate(h.cDate!, e.start!) &&
                        this._dateService.isSameHour(h.hours!, e.start!)) {
                        filteredEvents.push(
                            this._calendarEventService.createCalendarEventFull(e, i, j));
                    }
                });
            });
        });
        return filteredEvents;
    }

    filterMultipleDayEvents
        (events: CalendarEventFull[]): [CalendarEventFull[], CalendarEventFull[]] {
        return bifilter(((e: CalendarEventFull) =>
            !this._dateService.isSameDate(e.end!, e.start!)), events);
    }

    findLeftForMultiDaysEventWeek(
        events: CalendarEventFull[],
        calendarDate: CalendarDate): CalendarEventFull[] {
        let filteredEvents: CalendarEventFull[] = [];
        this.getCalendarWeekRange(calendarDate).forEach((hours: CalendarHours, i) => {
            events.forEach((e: CalendarEventInput) => {
                if (hours.cDate! && this._dateService.isSameDate(hours.cDate!, e.start!)) {
                    filteredEvents.push(
                        this._calendarEventService.createCalendarEventFull(e, 0, i));
                }
            });
        });
        return filteredEvents;
    }

    findLeftForMultiDaysEventDay(
        events: CalendarEventFull[],
        calendarDate: CalendarDate): CalendarEventFull[] {
        let filteredEvents: CalendarEventFull[] = [];
        this.pushFirstRowForGrid(Array.of(calendarDate)).forEach((hours: CalendarHours, i) => {
            events.forEach((e: CalendarEventInput) => {
                if (hours.cDate! && this._dateService.isSameDate(hours.cDate!, e.start!) 
                || hours.cDate! && this._dateService.isBetween(hours.cDate!, e.start!, e.end!)) {
                    filteredEvents.push(
                        this._calendarEventService.createCalendarEventFull(e, 0, i));
                }
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



}