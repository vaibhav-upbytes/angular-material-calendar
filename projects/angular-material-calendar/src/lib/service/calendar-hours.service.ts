import { Injectable } from "@angular/core";
import { CalendarHours } from "../calendar-modal/calendar-hours/calendar-hours";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class CalendarHoursService {

    constructor(
        private _dateService: DateService
        ) {}

    getCalendarHours(): CalendarHours[] {
        return this._dateService.getHoursFormat().map((d) => {
           return {
               hours: d,
               isSelected: this._dateService.isHours(d)
           }
        });
    }
}