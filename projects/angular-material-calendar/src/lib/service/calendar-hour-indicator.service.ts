import { ElementRef, Injectable } from "@angular/core";
import { DateTime } from "luxon";
import { DateService } from "./date.service";

/**
 * @author vaibhav
 * will move hour indicator in every minute.
 * 
 */
@Injectable({
    providedIn: "root"
})
export class CalendarHourIndicatorService {

    currentTime?: DateTime;
    hour?: number;
    minute?: number;
    constructor(
        private _dateService: DateService
    ) { 
        this.updateTop();

    }

    updateTop() {
        this.currentTime = this._dateService.today().current;
        this.hour = this.currentTime.hour;
        this.minute = this.currentTime.minute;
    }

    styleTop( _element: ElementRef<HTMLElement>,
        TOP: string): void {
        (_element!.nativeElement.style as any)['top']
            = this.calc(`(${TOP} + 0px) * ${this.hour! + 1} + ${this.calculateEventStartOffset()}`);
    }

    calculateEventStartOffset(): string {
        return `${this.minute! /12}em`
    }

    calc(exp: string): string {
        return `calc(${exp})`;
    }

}