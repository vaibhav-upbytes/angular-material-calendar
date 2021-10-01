import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../state/date.action';
import { CalendarDate } from '../calendar-date/calendar-date';


@Component({
  selector: 'angular-material-calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent {
  date$?: Observable<CalendarDate>;
  _currentDate?: CalendarDate;

  constructor(private store: Store<{ _date: CalendarDate}>) {
    this.date$ = store.select('_date');
    this.date$.subscribe((d: CalendarDate) => this._currentDate = d);
  }

  increment() {
    this.store.dispatch(increment());  
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
}