import { ElementRef, Injectable } from '@angular/core';
import { CalendarEventFull } from '../calendar-modal/calendar-event/calendar-event-full';
import { CalendarEventInput } from '../calendar-modal/calendar-event/calendar-event-input';
import { CalendarEventConflictService } from './calendar-event-conflict.service';
import { DateService } from './date.service';

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
        left: string, top: string, width: number, height: string): void {
        this.styleWidth(event, _element, width);
        this.styleLeft(event, _element, left);
        this.styleTop(event, _element, top);
        this.styleHeight(event, _element, height);
        this.styleBackground(event, _element);
    }

    calc(exp: string): string {
        return `calc(${exp})`;
    }

    styleLeft(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        left: string): void {
        if (event.conflics! > 0 && event.leftFr! > 1) {
            (_element.nativeElement.style as any)['left'] =
                this.calc(`(${left} - 0px + 0px) * ${event.leftFr!}`);
        } else {
            (_element.nativeElement.style as any)['left']
            = this.calc(`(${left} - 0px + 0px) * ${event.left}`);
        }
    }

    styleTop(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        top: string): void {
        (_element.nativeElement.style as any)['top']
            = !event.isAllDay ?
                this.calc(`(${top} + 0px) * ${event.top}
                + ${this.calculateEventStartOffset(event)}`) : '5px';
    }

    styleWidth(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        width: number): void {
        (_element.nativeElement.style as any)['width']
            = this.calc(`(${width}% - 0px) * ${event.widthFr!} + 0px`);
    }

    styleHeight(event: CalendarEventFull, _element: ElementRef<HTMLElement>,
        height: string): void {
        (_element.nativeElement.style as any)['height'] =
            !event.isAllDay ? this.calc(`${this.calculateEventHeight(event)}`) : height;
    }

    styleBackground(event: CalendarEventFull, _element: ElementRef<HTMLElement>): void {
        (_element.nativeElement.style as any)['background-color'] =
            `${event.color}`;
    }

    calculateEventStartOffset(event: CalendarEventFull): string {
        return `${this._dateService.minute(event.start!) / 12}em`;
    }

    calculateEventHeight(event: CalendarEventFull): string {
        return `${this._dateService.timeDiffinMinutes(event.start!, event.end!)! / 12}em`;
    }

    eventsubtitle(event: CalendarEventFull): string {
        return `${this._dateService.getTimeFormat(event.start!)}
        - ${this._dateService.getTimeFormat(event.end!)}`;
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
        const eventMap: Map<number, CalendarEventFull[]> = new Map<number, CalendarEventFull[]>();
        events.forEach((e: CalendarEventFull) => {
            if (eventMap.has(e.left!)) {
                eventMap.get(e.left!)?.push(e);
            } else {
                eventMap.set(e.left!, Array.of(e));
            }
        });
        return eventMap;
    }

    filteredConflictedEvents(events: CalendarEventFull[], days: number): CalendarEventFull[] {
        const eventMap: Map<number, CalendarEventFull[]> = this.filterEventsBySameLeft(events);
        eventMap.forEach((v: CalendarEventFull[]) => {
            this._calendarEventConflictService.conflicting(v, days);
        });
        return events;
    }

    isAllDayEvent(event: CalendarEventFull): CalendarEventFull {
        event.isAllDay = !this._dateService.isSameDate(event.end!, event.start!);
        return event;
    }

    allDayEventWidth(event: CalendarEventFull): CalendarEventFull {
        if (event.isAllDay) {
            const diff = this._dateService.getDateTime(event.end!).day
                - this._dateService.getDateTime(event.start!).day + 1;
            event.widthFr = diff;
        }
        return event;
    }

    eventFullTime(event: CalendarEventFull): string {
        const start = this._dateService.getDateTime(event.start!);
        return `${start.weekdayShort} ${start.day}
        /${start.month}/${start.year} 
        ${this._dateService.getTimeFormat(event.start!)}
         - ${this._dateService.getTimeFormat(event.end!)}`;
    }


}
