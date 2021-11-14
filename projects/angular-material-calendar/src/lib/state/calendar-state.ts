import { CalendarDate } from '../calendar-modal/calendar-date/calendar-date';
import { CalendarView } from '../calendar-modal/calendar-view/calendar-view';

export interface CalendarState {
    _date: CalendarDate,
    _view: CalendarView
}
