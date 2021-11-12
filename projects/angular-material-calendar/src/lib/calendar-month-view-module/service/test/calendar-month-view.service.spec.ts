import { TestBed } from "@angular/core/testing";
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateTime } from "luxon";
import { MonthViewService } from "../calendar-month-view.service";

export const events = [{
    "start": DateTime.now().toMillis(),
    "end": DateTime.now().plus({ hours: 5 }).toMillis(),
    "title": "event16",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
}];
export const calendarDate = { current: DateTime.now() };
let monthViewService: MonthViewService;
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
        monthViewService = TestBed.inject(MonthViewService);

    });

    it('should be able to detect monthview service', () => {
        expect(monthViewService).toBeTruthy();
    });

    it('should be able to get month date array', () => {
        let map = monthViewService.getMonthViewDates(calendarDate);
        expect(map.length).toEqual(35);
    });

    it('should be able to get event and date map', () => {
        let map = monthViewService.getCalendarDateEventMap(calendarDate, events);
        expect(map.size).toEqual(35);
    });

});