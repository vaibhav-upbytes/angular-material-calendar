import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarState } from "../state/calendar-state";


export const upbytesCalendarFeatureKey = 'upbytes_calendar';

export const selectCalendarState = createFeatureSelector<CalendarState>(
    upbytesCalendarFeatureKey
);

export const selectCalendarViewState = createSelector(
    selectCalendarState,
    (state) => state._view
);

export const selectCalendarDateState = createSelector(
    selectCalendarState,
    (state) => state._date
);