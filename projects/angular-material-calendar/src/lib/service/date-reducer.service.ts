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
                on(increment, (state) =>  this._dateService.addCalendarMonths(state, 1)),
                on(decrement, (state) => this._dateService.addCalendarMonths(state, -1)),
                on(reset, (state) => this._dateService.today())
              )
        };

    
}