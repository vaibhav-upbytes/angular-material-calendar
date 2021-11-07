import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { day, month, week } from '../../../actions/calendar-view.action'
import { CalendarView } from '../../../calendar-modal/calendar-view/calendar-view';
import { CalendarViewPortService } from '../../../service/calendar-view-port.service';

/**
 * @author vaibhav
 * Calendar toggel component will be display right top corner of the calendar header. Toggle 
 * button will switch view in between day/week/month. 
 */
@Component({
  selector: 'upbytes-angular-material-calendar-toggel',
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
    private store: Store<{ _view: CalendarView }>,
    private calendarViewPortService: CalendarViewPortService
  ) {
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
    this.calendarViewPortService.viewport.subscribe(s => this.viewport = s);
  }

  /**
   * use to dispatch month view in store
   */
  month() {
    this.store.dispatch(month());
  }

  /**
   * use to dispatch week view in store
   */
  week() {
    this.store.dispatch(week());
  }

  /**
   * use to dispatch day view in store
   */
  day() {
    this.store.dispatch(day());
  }

  get size(): boolean {
    return this.viewport !== 'Small' && this.viewport !== 'XSmall';
  }
}