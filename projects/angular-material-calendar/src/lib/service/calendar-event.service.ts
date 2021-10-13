import { Injectable } from "@angular/core";
import { DateService } from "./date.service";

const gridHeight = 80;

@Injectable({
    providedIn: 'root'
})
export class CalendarHoursService {
    constructor(
        private _dateService: DateService
        ) {}

            
}