import { Moment } from 'moment';
import { CalendarDate } from "../calendar-date/calendar-date";
import { DateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class DateService {
   constructor(
      private _dateAdapter: DateAdapter<Moment>
      ) {}

   today(): CalendarDate {
      return {current: this._dateAdapter.today()};
   }

   addCalendarYears(date: CalendarDate, years: number): CalendarDate {
      return {current: this._dateAdapter.addCalendarYears(date.current, years)};
   }
  
   addCalendarMonths(date: CalendarDate, months: number): CalendarDate {
      return {current: this._dateAdapter.addCalendarMonths(date.current, months)};
   }
  
   addCalendarDays(date: CalendarDate, days: number): CalendarDate {
      return {current: this._dateAdapter.addCalendarDays(date.current, days)};
   }
   
   getMonthNames(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return style == 'long' ? date.current.format('MMMM') : date.current.format('M');
   }

   getYearName(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return this._dateAdapter.getYearName(date.current);
   }

}