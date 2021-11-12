import { Injectable } from "@angular/core";
import { createReducer, on, ActionReducer} from '@ngrx/store';
import { month, week, day } from '../actions/calendar-view.action';
import { CalendarView } from "../calendar-modal/calendar-view/calendar-view";

@Injectable({
    providedIn: 'root'
})
export class CalendarViewReducerService {

    constructor(
        ) {}

    public  getReducer():ActionReducer<CalendarView> {
        return createReducer(
                {view : 'month'},
                on(month, (state) =>  {
                    return {
                        view: 'month'
                    };   
                }),
                on(week, (state) => {
                    return {
                        view: 'week'
                    };   
                }),
                on(day, (state) => {
                    return {
                        view: 'day'
                    };   
                })
              );
        }
}