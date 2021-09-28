import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { increment, decrement, reset } from '../state/date.action';


@Component({
  selector: 'angular-material-calendar-header',
  templateUrl: './calendar-header.component.html',
})
export class CalendarHeaderComponent {
  date$?: Observable<_moment.Moment>;

  constructor(private store: Store<{ date: _moment.Moment }>) {
    this.date$ = store.select('date');
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