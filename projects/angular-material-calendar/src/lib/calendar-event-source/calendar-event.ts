import { DateTime } from "luxon";
import { Moment } from "moment";

export type D = number |string | Moment | DateTime | Date;

export interface CalendarEvent {
    start?: D,
    end?: D,
    title?: string,
    color?: string,
    format?: string,
    description?: string
}