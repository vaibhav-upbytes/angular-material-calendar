import { Injectable } from "@angular/core";
import { Adapter } from "./calendar-adapter";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event-input";
import { isDate, isMoment } from "moment";
import { DateService } from "../service/date.service";
import { DateTime } from "luxon";
import { CalendarEvent, D } from "../calendar-event-source/calendar-event";

@Injectable({
    providedIn: "root",
})
export class CalendarEventInputAdapter<T extends CalendarEvent> implements Adapter<CalendarEventInput> {
    
    constructor (
        private _dateService: DateService
    ) { }
    adapt (item: T ): CalendarEventInput {
        return this.createCalendarEventInput(item);
    }

    createCalendarEventInput(data: T): CalendarEventInput {
        return {
            start: this.convertToMillis(data.start!),
            end: this.convertToMillis(data.end!),
            title: data.title,
            color: data.color,
            description: data.description
        }
    }

    convertToMillis(d: D): number {
        if(isDate(d)) {
            return d.getTime();
        } else if(isMoment(d)) {
            return d.milliseconds();
        } else if (typeof d == 'string') {
            return this._dateService.getDateTime(d).toMillis();
        } else if (typeof d == 'number') {
            return this._dateService.getDateTime(d).toMillis();
        } else if (DateTime.isDateTime(d)) {
            return d.toMillis();
        } 

        return DateTime.now().toMillis();
    }
}