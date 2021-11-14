import { Injectable } from '@angular/core';
import { DateService } from '../../service/date.service';
import { CalendarDate } from '../../calendar-modal/calendar-date/calendar-date';
import { CalendarMonthView } from '../calendar-month-view';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';

@Injectable({
    providedIn: 'root'
})
export class MonthViewService {

    constructor(
        private _dateService: DateService
    ) { }

    getMonthViewDates(date: CalendarDate): CalendarMonthView[] {
        const monthDates: CalendarDate[] = this._dateService.getMonthDatesRange(date);
        return monthDates.map((d) => this.createMonthViewDate(d));
    }

    getCalendarDateEventMap(
        date: CalendarDate, events: CalendarEventInput[]
    ): Map<CalendarMonthView, CalendarEventInput[]> {
        const dates: CalendarDate[] = this._dateService.getMonthDatesRange(date);
        const data = new Map<CalendarMonthView, CalendarEventInput[]>();
        dates.map((d) => {
            const gridDate = this.createMonthViewDate(d);
            data.set(gridDate, []);
            events!.map((event) => {
                if (this._dateService.isSameDate(d, event.start!)
                    || this._dateService.isBetween(d, event.start!, event.end!)) {
                    data.get(gridDate)?.push(event);
                }

            });
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
            month: this._dateService.getMonth(date) + 1,
            year: this._dateService.getYear(date),
            isEnable: this._dateService.getMonth(date) === this._dateService.getMonth(date),
            isToday: this._dateService.isToday(date)
        };
    }

    setDate(selected: CalendarMonthView, _currentDate: CalendarDate): CalendarDate {
        return this._dateService.setDate(selected.date,
            selected.month,
            selected.year,
            _currentDate);
    }
}
