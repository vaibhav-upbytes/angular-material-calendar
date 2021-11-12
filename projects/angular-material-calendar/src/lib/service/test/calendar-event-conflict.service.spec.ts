import { TestBed } from "@angular/core/testing";
import { CalendarEventConflictService } from "../calendar-event-conflict.service";

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

let eventConflictService: CalendarEventConflictService;
describe('calendar-event-conflict', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
            ]
        });
        eventConflictService = TestBed.inject(CalendarEventConflictService);

    });

    it('should be able to detect conflicting events', () => {
        expect(eventConflictService).toBeTruthy();
        eventConflictService.conflicting(events, 1);
        expect(events[1].leftFr).toBeGreaterThan(1);
    });

});