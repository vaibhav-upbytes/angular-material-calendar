import { Injectable } from "@angular/core";
import { createReducer, on, ActionReducer } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/date.action';
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class DateReducerService {

    constructor(
        private _dateService: DateService
        ) {}

    public  getReducer():ActionReducer<CalendarDate> {
        return createReducer(
                this._dateService.today(),
                on(increment, (state, _view) =>  {
                    if (_view.view == 'month') {
                        return this._dateService.addCalendarMonths(state, 1);
                    } else if (_view.view == 'week') {
                        return this._dateService.addCalendarWeeks(state, 1);
                    }
                    return this._dateService.addCalendarDays(state, 1);
                    
                }),
                on(decrement, (state, _view) => {
                    if (_view.view == 'month') {
                        return this._dateService.subtractCalendarMonths(state, 1);
                    } else if (_view.view == 'week') {
                        return this._dateService.subtractCalendarWeeks(state, 1);
                    }
                    return this._dateService.subtractCalendarDays(state, 1);
                    
                }),
                on(reset, (state) => this._dateService.today())
              )
        };

    
}