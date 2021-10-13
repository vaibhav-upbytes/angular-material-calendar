import { CalendarDate } from "../calendar-date/calendar-date";
import { CalendarEventInput } from "../calendar-event/calendar-event-input";

export interface CalendarHours {
    hours?: string,
    day?: string,
    date?: number,
    month?: number,
    year?: number,
    isToday?: boolean,
    isHourNow?: boolean,
    isFirst?: boolean,
    timeZone?: string,
    cDate?: CalendarDate,
    left?: number,
    top?: number
}