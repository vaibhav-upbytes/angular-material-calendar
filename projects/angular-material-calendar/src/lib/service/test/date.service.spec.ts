import { TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTime } from 'luxon';
import { DateService } from '../date.service';

let dateService: DateService;
describe('calendar-event-conflict', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]
        });
        dateService = TestBed.inject(DateService);

    });

    it('should be able to create date service', () => {
        expect(dateService).toBeTruthy();
    });

    it('should be able to add a day', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.addCalendarDays(calendarDate, 1);
        expect(add.current.day).toEqual(now.day + 1);
    });

    it('should be able to add a year', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.addCalendarYears(calendarDate, 1);
        expect(add.current.year).toEqual(now.year + 1);
    });

    it('should be able to add a week', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.addCalendarWeeks(calendarDate, 1);
        expect(add.current.weekNumber).toEqual(now.weekNumber + 1);
    });

    it('should be able to substract a day', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.subtractCalendarDays(calendarDate, 1);
        expect(add.current.day).toEqual(now.day - 1);
    });

    it('should be able to substract a year', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.subtractCalendarYears(calendarDate, 1);
        expect(add.current.year).toEqual(now.year - 1);
    });

    it('should be able to substract a week', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.subtractCalendarWeeks(calendarDate, 1);
        expect(add.current.weekNumber).toEqual(now.weekNumber - 1);
    });

    it('should be able to get last day of month', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.getLastDayOfMonth(calendarDate);
        expect(add.current.day).toEqual(now.daysInMonth);
    });


    it('should be able to get last day of month', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const add = dateService.getLastDayOfWeek(calendarDate);
        expect(add.current.day).toEqual(now.endOf('week').day);
    });

    it('should be able to string value', () => {
        const now = DateTime.now();
        const add = dateService.getDateTimeFromString(now.toString());
        expect(add).toEqual(now);
    });

    it('is same hour', () => {
        const now = DateTime.now().toMillis();
        const hour = DateTime.now().set({ minute: 0 }).toFormat('hh:mm a');
        const add = dateService.isSameHour(hour, now);
        expect(add).toBeTrue();
    });

    it('time diffrence in hours', () => {
        const now = DateTime.now().toMillis();
        const after = DateTime.now().plus({hours: 5}).toMillis();
        const diff = dateService.timeDiffinHours(now, after);
        expect(diff).toEqual(5);
    });

    it('is date between', () => {
        const now = DateTime.now();
        const calendarDate = { current: now };
        const start = DateTime.now().minus({hours: 5}).toMillis();
        const end = DateTime.now().plus({hours: 5}).toMillis();
        const isBetween = dateService.isBetween(calendarDate, start, end);
        expect(isBetween).toBeTrue();
    });
});
