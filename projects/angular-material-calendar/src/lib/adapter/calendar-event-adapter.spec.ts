import { TestBed } from "@angular/core/testing";
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateTime } from "luxon";
import * as moment from "moment";
import { CalendarEvent } from "../calendar-event-source/calendar-event";
import { DateService } from "../service/date.service";
import { CalendarEventInputAdapter } from "./calendar-event-adapter";

export const event = {
    "start": 1634621592000,
    "end": 1634625192000,
    "title": "string  string string string string string",
    "color": "#e2e6c7"
};

let eventAdapter: CalendarEventInputAdapter<CalendarEvent>;
describe('calendar-event-adapter', () => {
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            providers: [
                CalendarEventInputAdapter,
                DateService,
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]
        });
        eventAdapter = TestBed.inject(CalendarEventInputAdapter);

    });

    it('javascript date convert to milliseconds', () => {
        let date = new Date();
        expect(eventAdapter.convertToMillis(date)).toBe(date.getMilliseconds());
    }); 

    it('moment date convert to milliseconds', () => {
        let date = moment();
        expect(eventAdapter.convertToMillis(date)).toBe(date.milliseconds());
    });

    it('datetime date convert to milliseconds', () => {
        let date = DateTime.now();
        expect(eventAdapter.convertToMillis(date)).toBe(date.toMillis());
    });

    it('mills date convert to milliseconds', () => {
        let date = DateTime.now().toMillis();
        expect(eventAdapter.convertToMillis(date)).toBe(date);
    });

    it('string date convert to milliseconds', () => {
        let date = DateTime.now();
        expect(eventAdapter.convertToMillis(date.toString())).toBe(date.toMillis());
    });

    it('adapt any', () => {
        let data = eventAdapter.adapt(event);
        expect(data).toBeTruthy();
        expect(data.start).toEqual(event.start);
    });
});