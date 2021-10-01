import { Injectable } from "@angular/core";
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../state/date.action';
import { CalendarDateState } from "../state/calendar-date-state";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})
export class DateReducerService {

    constructor(
        private _dateService: DateService
        ) {}

    public  getReducer():ActionReducerMap<CalendarDateState> {
        return {
            _date : createReducer(
                this._dateService.today(),
                on(increment, (state) =>  this._dateService.addCalendarMonths(state, 1)),
                on(decrement, (state) => this._dateService.addCalendarMonths(state, -1)),
                on(reset, (state) => this._dateService.today())
              )
        }

    }
}