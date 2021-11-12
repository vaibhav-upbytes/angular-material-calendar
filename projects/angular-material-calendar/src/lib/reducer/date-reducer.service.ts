import { Injectable } from "@angular/core";
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { increment, decrement, reset, goto } from '../actions/date.action';
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { DateService } from "../service/date.service";

@Injectable({
    providedIn: 'root'
})
export class DateReducerService {

    constructor(
        private _dateService: DateService
    ) { }

    public getReducer(): ActionReducer<CalendarDate> {
        return createReducer(
            this._dateService.today(),
            on(increment, (state, _view) => {
                if (_view.view == 'month') {
                    return this._dateService.addCalendarMonths(state, 1);
                } else if (_view.view == 'week') {
                    return this._dateService.addCalendarWeeks(state, 1);
                } else if (_view.view == 'day') {
                    return this._dateService.addCalendarDays(state, 1);
                } else {
                    return this._dateService.addCalendarDays(state, 1);
                }

            }),
            on(decrement, (state, _view) => {
                if (_view.view == 'month') {
                    return this._dateService.subtractCalendarMonths(state, 1);
                } else if (_view.view == 'week') {
                    return this._dateService.subtractCalendarWeeks(state, 1);
                } else if (_view.view == 'day') {
                    return this._dateService.subtractCalendarDays(state, 1);
                } else {
                    return this._dateService.subtractCalendarDays(state, 1);
                }
            }),
            on(reset, (state) => this._dateService.today()),
            on(goto, (state, _gotoDate) => this._dateService.setDate(
                _gotoDate.current.day, _gotoDate.current.month,
                _gotoDate.current.year, state))
        )
    }

}