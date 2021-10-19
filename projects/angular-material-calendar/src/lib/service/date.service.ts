import { DateTime } from 'luxon';
import { CalendarDate } from "../calendar-modal/calendar-date/calendar-date";
import { DateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";

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
      private _dateAdapter: DateAdapter<DateTime>
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

   addCalendarWeeks(date: CalendarDate, weeks: number): CalendarDate {
      return {current:date.current.plus({weeks : weeks})};
   }

   subtractCalendarYears(date: CalendarDate, years: number): CalendarDate {
      return {current: date.current.minus({ years: years})};
   }
  
   subtractCalendarMonths(date: CalendarDate, months: number): CalendarDate {
      return {current: date.current.minus({months: months})};
   }
  
   subtractCalendarDays(date: CalendarDate, days: number): CalendarDate {
      return {current: date.current.minus({days: days})};
   }

   subtractCalendarWeeks(date: CalendarDate, weeks: number): CalendarDate {
      return {current: date.current.minus({weeks: weeks})};
   }

   getMonthNames(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return style == 'long' ? date.current.monthLong : date.current.monthShort;
   }

   getYearName(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return this._dateAdapter.getYearName(date.current);
   }

   getDayName(date: CalendarDate, style: 'long' | 'short' | 'narrow'): string {
      return style == 'long' ? date.current.weekdayLong : date.current.weekdayShort;
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
      return {current:this._dateAdapter
         .createDate(this.getYear(date), this.getMonth(date), 1)};
   }

   getLastDayOfMonth(date: CalendarDate): CalendarDate {
      return {current: 
         this._dateAdapter
         .createDate(this.getYear(date), this.getMonth(date), date.current.daysInMonth)};
   }

   getFirstDayOfWeek(date: CalendarDate): CalendarDate {
      return {current : date.current.startOf('week')};
   }

   getLastDayOfWeek(date: CalendarDate): CalendarDate {
      return {current : date.current.endOf('week')};
   }

   getDaysInMonthRange(date: CalendarDate): number {
      return this.getLastDayOfWeek(this.getLastDayOfMonth(date))
                  .current.diff(this.getFirstDayOfWeek(date).current, 'days').days;
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
      dates[0] = first;
      for (let i = 1; i < 35; i++) {
         first = this.addCalendarDays(first, 1);
         dates[i] = first;
      }
      return dates;
   }

   getWeekDatesRange(date: CalendarDate): CalendarDate[] {
      const dates: CalendarDate[] = Array(7);
      let first =  this.getFirstDayOfWeek(date);
      dates[0] = first
      for (let i = 1; i < 7; i++) {
         first = this.addCalendarDays(first, 1);
         dates[i] = first;
      }
      return dates;
   }

   getHoursFormat(): string[] {
      return dateRange(24, (i) => this.today().current
      .set({ hour: i, minute: 0 }).toFormat("hh:mm a"));
   }

   isToday(date: CalendarDate): boolean {
      return this.today().current.startOf("day").equals(date.current.startOf("day"));
   }

   isHoursNow(hours: string): boolean {
      return this.today().current.set({minute : 0})
      .toFormat("hh:mm a") == hours;
   }

   getTimeZoneFormat(date: CalendarDate): string {
      return `GMT ${this._dateAdapter.format(date.current, 'Z')}`;
   }

   getDateTime(d: number): DateTime {
      return DateTime.fromMillis(d); 
   }

   isSameHour(hours: string, eventDate: number): boolean {
      return this.getDateTime(eventDate)
      .set({ minute : 0}).toFormat("hh:mm a") == hours; 
   }

   isSameDate<T extends CalendarDate | number>(date: T , eventDate: number): boolean {
      return  typeof date == 'object' ?
       this._dateAdapter.sameDate(date.current, this.getDateTime(eventDate)) : 
       this._dateAdapter.sameDate(this.getDateTime(date), this.getDateTime(eventDate));
   }

   timeDiff(start: number, end: number) {
      return this.getDateTime(end)
      .diff(this.getDateTime(start), ['months', 'days', 'hours', 'minutes'])
      .toObject();
   }

   timeDiffinHours(start: number, end: number): number | undefined {
      return this.timeDiff(start, end).hours;
   }

   timeDiffinMinutes(start: number, end: number): number | undefined {
      let diff  = this.timeDiff(start, end);
      return diff.hours! * 60 + diff.minutes!;
   }

   minute(start: number): number {
      return this.getDateTime(start).minute;
   }

   getTimeFormat(d: number): string {
      return this.getDateTime(d).toFormat("hh:mm a");
   }

   restoreFromStore(d: CalendarDate): CalendarDate {
      return {current: this.getDateTime(d.current.toMillis())};
   }

   isBetween(date: CalendarDate,
      start: number, end: number): boolean {
         return start < date.current.toMillis() 
         && date.current.toMillis() < end;
   }
}