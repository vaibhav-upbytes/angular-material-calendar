import { Injectable } from "@angular/core";
import { DateService } from "../../service/date.service";
import { CalendarDate } from "../../calendar-modal/calendar-date/calendar-date";
import { CalendarMonthView } from "../calendar-month-view";
import { CalendarEventInput } from "../../calendar-modal/calendar-event/calendar-event";

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
            return { 
                     date: this._dateService.getDate(d),
                     day: this._dateService.getDayName(d, 'short'),
                     isEnable: this._dateService.getMonth(date) == this._dateService.getMonth(d),
                     isToday: this._dateService.isToday(d)
                }
        });
    }

    getCalendarDateEventMap(
        date: CalendarDate , events: CalendarEventInput[]
        ): Map<CalendarMonthView, CalendarEventInput[]> {
            let d = date;
        let dates: CalendarDate[] = this._dateService.getMonthDatesRange(d);
        let data = new Map<CalendarMonthView, CalendarEventInput[]>();
        dates.map((d) => {
            let gridDate = this.createMonthViewDate(d);
            data.set(gridDate, []);
            events.map((event) => {
                if(this._dateService.isSameDate(d, event.start!)) 
                {  
                    data.get(gridDate)?.push(event);
                }

            })
        });
        return data;
    }

    // need to be fixed to get first day as a monday always
    getDayOfWeeksNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this._dateService.getDayOfWeekNamesFromMonday(style);
    }

    createMonthViewDate(date: CalendarDate): CalendarMonthView {
        return { 
            date: this._dateService.getDate(date),
            day: this._dateService.getDayName(date, 'short'),
            isEnable: this._dateService.getMonth(date) == this._dateService.getMonth(date),
            isToday: this._dateService.isToday(date)
       }
    }

    getEventDisplay(event: CalendarEventInput): string{
        return `${this._dateService.getTimeFormat(event.start!)} ${event.title}`;
    }
}