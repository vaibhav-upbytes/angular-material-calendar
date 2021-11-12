import { Injectable } from "@angular/core";
import { Adapter } from "./calendar-adapter";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event-input";
import { isDate, isMoment } from "moment";
import { DateService } from "../service/date.service";
import { DateTime } from "luxon";
import { CalendarEvent, D } from "../calendar-event-source/calendar-event";

/**
 * @author vaibhav
 * calendar event adpater service is used to convert input data into CalendarEventInput
 */
@Injectable({
    providedIn: "root",
})
export class CalendarEventInputAdapter<T extends CalendarEvent> implements Adapter<CalendarEventInput> {
    
    constructor (
        private _dateService: DateService
    ) { }

    /**
     * this function is adapt any input into CalenarEventInput
     * @param item accept any type of input
     * @returns CalenarEventInput
     */
    adapt (item: T ): CalendarEventInput {
        return this.createCalendarEventInput(item);
    }

    /**
     * convert data into CalendarEventInput
     * @param data 
     * @returns CalendarEventInput
     */
    createCalendarEventInput(data: T): CalendarEventInput {
        return {
            start: this.convertToMillis(data.start!),
            end: this.convertToMillis(data.end!),
            title: data.title,
            color: data.color,
            description: data.description
        }
    }

    /**
     * convert date into milliseconds
     * @param d input date
     * @returns date into milliseconds
     */
    convertToMillis(d: D): number {
        if(isDate(d)) {
            return d.getMilliseconds();
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

    /**
     * sort CalendarEventInput array
     * @param e array ofCalndarEventInput
     * @returns sorted array
     */
    sort(e: CalendarEventInput[]): CalendarEventInput[]{
        return e.sort((a, b) => a.start! - b.start!);
    }
}