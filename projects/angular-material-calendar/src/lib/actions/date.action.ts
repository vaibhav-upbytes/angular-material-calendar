import { createAction, props } from '@ngrx/store';
import { CalendarDate } from '../calendar-modal/calendar-date/calendar-date';
import { CalendarView } from '../calendar-modal/calendar-view/calendar-view';

export const increment = createAction('[Date Component] Increment', props<CalendarView>());
export const decrement = createAction('[Date Component] Decrement',  props<CalendarView>());
export const reset = createAction('[Date Component] Reset',  props<CalendarView>());
export const goto = createAction('[Date Component] Goto',  props<CalendarDate>());
