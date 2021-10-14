import { ElementRef, Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";
import { DateService } from "./date.service";

const gridHeight = 80;

@Injectable({
    providedIn: 'root'
})
export class CalendarEventService {
    constructor(
        private _dateService: DateService
        ) {}

    setEventStyle(
        event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        LEFT: string, TOP: string, WIDTH: string, HEIGHT: string): void {
            this.styleLeft(event, _element, LEFT);
            this.styleWidth(event, _element, WIDTH);
            this.styleTop(event, _element, TOP);
            this.styleHeight(event, _element, HEIGHT);
            this.styleBackground(event, _element, HEIGHT);
    }

    calc(exp: string): string {
        return `calc(${exp})`;
    }

    styleLeft(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        LEFT: string): void {
            (_element.nativeElement.style as any)['left'] = this.calc(`(${LEFT} - 0px + 0px) * ${event.left}`);
    }

    styleTop(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        TOP: string): void {
            (_element.nativeElement.style as any)['top'] 
            =  this.calc(`(${TOP} + 0px) * ${event.top} + ${this.calculateEventStartOffset(event)}`);
    }

    styleWidth(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        WIDTH: string): void {
            (_element.nativeElement.style as any)['width'] = this.calc(`(${WIDTH} - 0px) * 1 + 0px`);
    }

    styleHeight(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        HEIGHT: string): void {
            (_element.nativeElement.style as any)['height'] = 
            this.calc(`${this.calculateEventHeight(event)}`);
    }

    styleBackground(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        HEIGHT: string): void {
            (_element.nativeElement.style as any)['background-color'] = 
            `${event.color}`;
    }

    calculateEventStartOffset(event: CalendarEventFull): string {
        return `${this._dateService.minute(event.start!) / 12}em`
    }

    calculateEventHeight(event: CalendarEventFull): string {
        return `${this._dateService.timeDiffinMinutes(event.start!, event.end!) / 12}em`
    }

    eventsubtitle(event: CalendarEventFull): string {
        return `${this._dateService.getTimeFormat(event.start!)} - ${this._dateService.getTimeFormat(event.end!)}`;
    }
}