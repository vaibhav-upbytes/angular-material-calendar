import { ElementRef, Injectable } from "@angular/core";
import { CalendarEventFull } from "../calendar-modal/calendar-event/calendar-event-full";
import { CalendarEventInput } from "../calendar-modal/calendar-event/calendar-event-input";
import { CalendarEventConflictService } from "./calendar-event-conflict.service";
import { DateService } from "./date.service";

/**
 * @author vaibhav
 * calendar event servies is use to input style on event snippets.
 */
@Injectable({
    providedIn: 'root'
})
export class CalendarEventService {
    constructor(
        private _dateService: DateService,
        private _calendarEventConflictService: CalendarEventConflictService
    ) { }

    setEventStyle(
        event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        LEFT: string, TOP: string, WIDTH: number, HEIGHT: string): void {
        this.styleWidth(event, _element, WIDTH);
        this.styleLeft(event, _element, LEFT);
        this.styleTop(event, _element, TOP);
        this.styleHeight(event, _element, HEIGHT);
        this.styleBackground(event, _element, HEIGHT);
    }

    calc(exp: string): string {
        return `calc(${exp})`;
    }

    styleLeft(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        LEFT: string): void {
        if (event.conflics! > 0 && event.leftFr! > 1) {
            (_element.nativeElement.style as any)['left'] =
                this.calc(`(${LEFT} - 0px + 0px) * ${event.leftFr!}`);
        } else
            (_element.nativeElement.style as any)['left'] = this.calc(`(${LEFT} - 0px + 0px) * ${event.left}`);
    }

    styleTop(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        TOP: string): void {
        (_element.nativeElement.style as any)['top']
            = !event.isAllDay ?
                this.calc(`(${TOP} + 0px) * ${event.top} + ${this.calculateEventStartOffset(event)}`) : "5px";
    }

    styleWidth(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        WIDTH: number): void {
             (_element.nativeElement.style as any)['width'] = this.calc(`(${WIDTH}% - 0px) * ${event.widthFr!} + 0px`);
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

    createCalendarEventFull(final: CalendarEventInput,
        top: number, left: number): CalendarEventFull {
        return {
            start: final.start,
            end: final.end,
            title: final.title,
            color: final.color,
            format: final.format,
            description: final.description,
            left: left,
            top: top,
            height: this.calculateEventHeightFraction(final),
            widthFr: 1,
            conflics: 0,
            leftFr: 1
        };
    }

    calculateEventHeightFraction(e: CalendarEventInput): number {
        return this._dateService.timeDiffinMinutes(e.start!, e.end!)! / 12;
    }

    filterEventsBySameLeft(events: CalendarEventInput[]): Map<number, CalendarEventFull[]> {
        let eventMap: Map<number, CalendarEventFull[]> = new Map<number, CalendarEventFull[]>();
        events.forEach((e: CalendarEventFull) => {
            eventMap.has(e.left!) ? eventMap.get(e.left!)?.push(e) : eventMap.set(e.left!, Array.of(e));
        });
        return eventMap;
    }

    filteredConflictedEvents(events: CalendarEventFull[], DAYS: number): CalendarEventFull[] {
        let eventMap: Map<number, CalendarEventFull[]> = this.filterEventsBySameLeft(events);
        eventMap.forEach((v: CalendarEventFull[], k: number) => {
            this._calendarEventConflictService.conflicting(v, DAYS);
        });
        return events;
    }

    isAllDayEvent(event: CalendarEventFull): CalendarEventFull {
        event.isAllDay = !this._dateService.isSameDate(event.end!, event.start!);
        return event;
    }

    allDayEventWidth(event: CalendarEventFull): CalendarEventFull {
        if (event.isAllDay) {
            let diff = this._dateService.getDateTime(event.end!).day
                - this._dateService.getDateTime(event.start!).day + 1;
            event.widthFr = diff;
        }
        return event;
    }

    eventFullTime(event: CalendarEventFull): string {
        let start = this._dateService.getDateTime(event.start!)

        return `${start.weekdayShort} ${start.day}/${start.month}/${start.year} ${this._dateService.getTimeFormat(event.start!)} - ${this._dateService.getTimeFormat(event.end!)}`;
    }


}