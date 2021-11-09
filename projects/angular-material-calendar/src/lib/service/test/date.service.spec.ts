import { TestBed } from "@angular/core/testing";
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateTime } from "luxon";
import { DateService } from "../date.service";

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
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.addCalendarDays(calendarDate, 1);
        expect(add.current.day).toEqual(now.day + 1);
    });

    it('should be able to add a year', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.addCalendarYears(calendarDate, 1);
        expect(add.current.year).toEqual(now.year + 1);
    });

    it('should be able to add a week', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.addCalendarWeeks(calendarDate, 1);
        expect(add.current.weekNumber).toEqual(now.weekNumber + 1);
    });

    it('should be able to substract a day', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.subtractCalendarDays(calendarDate, 1);
        expect(add.current.day).toEqual(now.day - 1);
    });

    it('should be able to substract a year', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.subtractCalendarYears(calendarDate, 1);
        expect(add.current.year).toEqual(now.year - 1);
    });

    it('should be able to substract a week', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.subtractCalendarWeeks(calendarDate, 1);
        expect(add.current.weekNumber).toEqual(now.weekNumber - 1);
    });

    it('should be able to get last day of month', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.getLastDayOfMonth(calendarDate);
        expect(add.current.day).toEqual(now.daysInMonth);
    });


    it('should be able to get last day of month', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let add = dateService.getLastDayOfWeek(calendarDate);
        expect(add.current.day).toEqual(now.endOf('week').day);
    });

    it('should be able to string value', () => {
        let now = DateTime.now();
        let add = dateService.getDateTimeFromString(now.toString());
        expect(add).toEqual(now);
    });

    it('is same hour', () => {
        let now = DateTime.now().toMillis();
        let hour = DateTime.now().set({ minute: 0 }).toFormat("hh:mm a");
        let add = dateService.isSameHour(hour, now);
        expect(add).toBeTrue();
    });

    it('time diffrence in hours', () => {
        let now = DateTime.now().toMillis();
        let after = DateTime.now().plus({hours: 5}).toMillis();
        let diff = dateService.timeDiffinHours(now, after);
        expect(diff).toEqual(5);
    });

    it('is date between', () => {
        let now = DateTime.now();
        let calendarDate = { current: now };
        let start = DateTime.now().minus({hours: 5}).toMillis();
        let end = DateTime.now().plus({hours: 5}).toMillis();
        let isBetween = dateService.isBetween(calendarDate, start, end)
        expect(isBetween).toBeTrue();
    });
});