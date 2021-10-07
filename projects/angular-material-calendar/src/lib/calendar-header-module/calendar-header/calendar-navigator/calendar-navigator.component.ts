import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../../../actions/date.action';
import { CalendarDate } from '../../../calendar-modal/calendar-date/calendar-date';
import { CalendarView } from '../../../calendar-modal/calendar-view/calendar-view';

@Component({
    selector: 'angular-material-calendar-navigator',
    templateUrl: './calendar-navigator.component.html',
    styleUrls: [
      'calendar-navigator.component.scss'
    ]
  })
export class CalendarNavigatorComponent {
    date$?: Observable<CalendarDate>;
    _currentDate?: CalendarDate;
    _view$?: Observable<CalendarView>;
    _view?: CalendarView;
  
    constructor(
      private dstore: Store<{ _date: CalendarDate}>,
      private vstore: Store<{ _view: CalendarView}>
      ) {
      this.date$ = dstore.select('_date');
      this.date$.subscribe((d: CalendarDate) => this._currentDate = d);
      this._view$ = vstore.select('_view');
      this._view$.subscribe((v) => this._view = v);
    }
  
    increment() {
      this.dstore.dispatch(increment(this._view!));  
    }
   
    decrement() {
      this.dstore.dispatch(decrement(this._view!));
    }
   
    reset() {
      this.dstore.dispatch(reset(this._view!));
    }

}