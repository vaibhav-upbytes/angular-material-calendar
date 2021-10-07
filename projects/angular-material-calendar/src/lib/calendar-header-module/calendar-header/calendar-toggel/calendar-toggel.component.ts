import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { day, month, week} from '../../../actions/calendar-view.action'
import { CalendarView } from '../../../calendar-modal/calendar-view/calendar-view';

@Component({
    selector: 'angular-material-calendar-toggel',
    templateUrl: './calendar-toggel.component.html',
    styleUrls: [
        './calendar-toggel.component.scss'
    ]
  })
export class CalendarHeaderToggelComponent {
  _view$?: Observable<CalendarView>;
  _view?: CalendarView;
  
  constructor(
    private store: Store<{ _view: CalendarView}> 
  ) {
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
  }

  month() {
    this.store.dispatch(month());  
  }
 
  week() {
    this.store.dispatch(week());
  }
 
  day() {
    this.store.dispatch(day());
  }
}