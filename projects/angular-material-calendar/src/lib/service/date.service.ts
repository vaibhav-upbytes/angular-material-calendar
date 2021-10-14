import { Moment } from 'moment';
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { DateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";
import * as moment from 'moment';

export function dateRange<T>(length: number, lamdaFunction: (index: number) => T): T[] {
   const dateArr = Array(length);
   for (let i = 0; i < length; i++) {
     dateArr[i] = lamdaFunction(i);
   }
   return dateArr;
}

@Injectable({
   providedIn: 'root'
})
export class DateService {
   constructor(
      private _dateAdapter: DateAdapter<Moment>
      ) {}

   today(): CalendarDate {
      return this.clone({current: this._dateAdapter.today()});
   }

   addCalendarYears(date: CalendarDate, years: number): CalendarDate {
      return this.clone({current: this._dateAdapter.addCalendarYears(date.current, years)});
   }
  
   addCalendarMonths(date: CalendarDate, months: number): CalendarDate {
      return this.clone({current: this._dateAdapter.addCalendarMonths(date.current, months)});
   }
  
   addCalendarDays(date: CalendarDate, days: number): CalendarDate {
      return this.clone({current: moment(date.current).add(days, 'day')});
   }

   addCalendarWeeks(date: CalendarDate, weeks: number): CalendarDate {
      return this.clone({current: moment(date.current).add(weeks, 'week')});
   }

   subtractCalendarYears(date: CalendarDate, years: number): CalendarDate {
      return this.clone({current: moment(date.current).subtract(years, "year")});
   }
  
   subtractCalendarMonths(date: CalendarDate, months: number): CalendarDate {
      return this.clone({current: moment(date.current).subtract(months, "month")});
   }
  
   subtractCalendarDays(date: CalendarDate, days: number): CalendarDate {
      return this.clone({current: moment(date.current).subtract(days, "day")});
   }

   subtractCalendarWeeks(date: CalendarDate, weeks: number): CalendarDate {
      return this.clone({current: moment(date.current).subtract(weeks, 'week')});
   }

   getMonthNames(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return style == 'long' ? date.current.format('MMMM') : date.current.format('M');
   }

   getYearName(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return this._dateAdapter.getYearName(date.current);
   }

   getDayName(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return style == 'long' ? date.current.format('dddd') : date.current.format('dd');
   }

   getYear(date: CalendarDate): number {
      return this._dateAdapter.getYear(date.current);
   }

   getMonth(date: CalendarDate): number {
      return this._dateAdapter.getMonth(date.current);
   }

   getDate(date: CalendarDate): number {
      return this._dateAdapter.getDate(date.current);
   }

   getFirstDayOfMonth(date: CalendarDate): CalendarDate {
      return this.clone({current:this._dateAdapter.createDate(this.getYear(date), this.getMonth(date), 1)});
   }

   getLastDayOfMonth(date: CalendarDate): CalendarDate {
      return this.clone({current: 
         this._dateAdapter.createDate(this.getYear(date), this.getMonth(date), date.current.daysInMonth())});
   }

   getFirstDayOfWeek(date: CalendarDate): CalendarDate {
      return this.clone({current : this._dateAdapter.clone(date.current).startOf('week')});
   }

   getLastDayOfWeek(date: CalendarDate): CalendarDate {
      return this.clone({current : this._dateAdapter.clone(date.current).endOf('week')});
   }

   getDaysInMonthRange(date: CalendarDate): number {
      return this.getLastDayOfWeek(this.getLastDayOfMonth(date))
                  .current.diff(this.getFirstDayOfWeek(date).current, 'days');
   }

   clone(date: CalendarDate): CalendarDate {
      return {current: this._dateAdapter.clone(date.current)};
   }

   getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
      return this._dateAdapter.getDayOfWeekNames(style);
   }

   getDayOfWeekNamesFromMonday(style: 'long' | 'short' | 'narrow'): string[] {
      let days = this.getDayOfWeekNames(style);
      return [...days.slice(1), days[0]];
   }

   getMonthDatesRange(date: CalendarDate): CalendarDate[] {
      const dates: CalendarDate[] = Array(35);
      let first =  this.getFirstDayOfWeek(this.getFirstDayOfMonth(date));
      for (let i = 0; i < 35; i++) {
         first = this.addCalendarDays(first, 1);
         dates[i] = first;
      }
      return dates;
   }

   getWeekDatesRange(date: CalendarDate): CalendarDate[] {
      const dates: CalendarDate[] = Array(7);
      let first =  this.getFirstDayOfWeek(date);
      for (let i = 0; i < 7; i++) {
         first = this.addCalendarDays(first, 1);
         dates[i] = first;
      }
      return dates;
   }
   getHoursFormat(): string[] {
      return dateRange(24, (i) => this.today().current.hour(i).format("hh A"));
   }

   isToday(date: CalendarDate): boolean {
      return this.today().current.isSame(date.current, "day");
   }

   isHoursNow(hours: string): boolean {
      return this.today().current.format("hh A") == hours;
   }

   getTimeZoneFormat(date: CalendarDate): string {
      return `GMT ${this._dateAdapter.format(date.current, 'Z')}`;
   }

   getMoment(d: string | Moment): Moment {
      return  moment(d, moment.ISO_8601); 
   }

   isSameHour(hours: string, eventDate: string | Moment): boolean {
      return this.getMoment(eventDate).format("hh A") == hours; 
   }

   isSameDate(date: CalendarDate, eventDate: string | Moment): boolean {
      return this._dateAdapter.sameDate(date.current, this.getMoment(eventDate));
   }

   timeDiff(start: string | Moment, end: string | Moment): moment.Duration {
      return  moment.duration(this.getMoment(end).diff(this.getMoment(start)));
   }

   timeDiffinHours(start: string | Moment, end: string | Moment): number {
      return  this.timeDiff(start, end).asHours();
   }

   timeDiffinMinutes(start: string | Moment, end: string | Moment): number {
      return  this.timeDiff(start, end).asMinutes();
   }

   minute(start: string | Moment): number {
      return  this.getMoment(start).minutes();
   }


   getTimeFormat(d:  string | Moment): string {
      return this.getMoment(d).format("hh:mm a");
   }
}