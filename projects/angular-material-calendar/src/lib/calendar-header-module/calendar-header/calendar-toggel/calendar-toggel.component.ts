import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { day, month, week} from '../../../actions/calendar-view.action'
import { CalendarView } from '../../../calendar-modal/calendar-view/calendar-view';
import { CalendarViewPortService } from '../../../service/calendar-view-port.service';

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
  viewport?: string;
  
  constructor(
    private store: Store<{ _view: CalendarView}>,
    private calendarViewPortService: CalendarViewPortService
  ) {
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
    this.calendarViewPortService.viewport.subscribe(s => this.viewport = s);
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

  get size(): boolean {
    return this.viewport !== 'Small' && this.viewport !== 'XSmall';
  }
}