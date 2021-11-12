import { TestBed } from "@angular/core/testing";
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { CalendarEventFull } from "../../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventService } from "../calendar-event.service";

export const events = [{
    "start": 1634639410000,
    "end": 1634661010000,
    "title": "event16",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
},
{
    "start": 1634639410000,
    "end": 1634653810000,
    "title": "event17",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
}
    ,
{
    "start": 1634654710000,
    "end": 1634661010000,
    "title": "event18",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
}];

let eventService: CalendarEventService;
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
        eventService = TestBed.inject(CalendarEventService);

    });

    it('should be able to detect conflicting events', () => {
        expect(eventService).toBeTruthy();
        let e = eventService.filteredConflictedEvents(events, 1);
        expect(e[1].leftFr).toBeGreaterThan(1);
    });

    it('should be able to detect allday events', () => {
        let event =   {
            "start": 1634581620000,
            "end": 1634754420000,
            "title": "multiple event19",
            "color": "#d8c6d9"
          };
        let e = eventService.isAllDayEvent(event);
        expect(e.isAllDay).toBeTrue();
        e = eventService.allDayEventWidth(e);
        expect(e.widthFr).toBeGreaterThan(1);
    });

    it('should be able to get CalendarEventFull', () => {
        let e: CalendarEventFull = eventService.createCalendarEventFull(events[0], 0, 0);
        
        expect(e).toBeTruthy();
    });

});