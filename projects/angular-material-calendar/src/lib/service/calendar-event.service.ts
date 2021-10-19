import { ElementRef, Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class CalendarEventService {
    constructor(
        private _dateService: DateService
        ) {}

    setEventStyle(
        event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        LEFT: string, TOP: string, WIDTH: number, HEIGHT: string): void {
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
            =  !event.isAllDay ? 
            this.calc(`(${TOP} + 0px) * ${event.top} + ${this.calculateEventStartOffset(event)}`) : "5px";
    }

    styleWidth(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        WIDTH: number): void {
            (_element.nativeElement.style as any)['width'] = this.calc(`(${WIDTH}% - 0px) * ${event.width} + 0px`);
    }

    styleHeight(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        HEIGHT: string): void {
            (_element.nativeElement.style as any)['height'] = 
            !event.isAllDay ? this.calc(`${this.calculateEventHeight(event)}`) : "4em";
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
        return `${this._dateService.timeDiffinMinutes(event.start!, event.end!)! / 12}em`
    }

    eventsubtitle(event: CalendarEventFull): string {
        return `${this._dateService.getTimeFormat(event.start!)} - ${this._dateService.getTimeFormat(event.end!)}`;
    }

    filteredConflictedEvents(events: CalendarEventFull[]): CalendarEventFull[] {
        for(let i = 0;  i < events.length; i++) {
            let e1 = events[i];
            let count = 0;
            for(let j = i+1; j < events.length; j++) {
                let e2 = events[j];
                if((e1.start! < e2.start! && e2.start! < e1.end!)
                 || (e1.start! < e2.end! && e2.end! < e1.end!)) {
                    count++;
                    e2.left = e1.left! + ((count === 1 ? count : count * 1.5)  / 10);
                    e2.width = e1.width! - ((count * 1.5)  / 10);
                    events[j] = e2;
                }
            }
        }
        return events;
    }

    isAllDayEvent(event: CalendarEventFull): CalendarEventFull {
        event.isAllDay = !this._dateService.isSameDate(event.end!, event.start!);
        if(event.isAllDay) {
            let diff = this._dateService.getDateTime(event.end!).day
             - this._dateService.getDateTime(event.start!).day + 1;
            event.width = diff + diff / 10;
        }
        return event; 
    }
}