import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../../../store/actions/date.action';
import { CalendarDate } from '../../../calendar-modal/calendar-date/calendar-date';
import { CalendarView } from '../../../calendar-modal/calendar-view/calendar-view';
import { CalendarViewPortService } from '../../../service/calendar-view-port.service';
import { selectCalendarDateState, selectCalendarViewState } from '../../../store';

/**
 * @author vaibhav
 *
 * calendar navigator component display left side of calednar header.
 * Prev: this button will move current view of calendar to previous view according to view selected
 * Next: this button will move current view of calendar to next view according to view selected
 * Today: this button will move current view of calendar to
 * current date view according to view selected
 */

@Component({
  selector: 'upbytes-angular-material-calendar-navigator',
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
  viewport?: string;

  constructor(
    private dstore: Store<{ _date: CalendarDate }>,
    private vstore: Store<{ _view: CalendarView }>,
    private calendarViewPortService: CalendarViewPortService
  ) {
    this.date$ = dstore.select(selectCalendarDateState);
    this.date$.subscribe((d: CalendarDate) => this._currentDate = d);
    this._view$ = vstore.select(selectCalendarViewState);
    this._view$.subscribe((v) => this._view = v);
    this.calendarViewPortService.viewport.subscribe(s => this.viewport = s);
  }

  /**
   * This function will dispatch a increment action to store.
   */
  increment() {
    this.dstore.dispatch(increment(this._view!));
  }

  /**
   * This function will dispatch a decrement action to store.
   */
  decrement() {
    this.dstore.dispatch(decrement(this._view!));
  }

  /**
   * This function will dispatch a reset action to store.
   */
  reset() {
    this.dstore.dispatch(reset(this._view!));
  }

  get size(): boolean {
    return this.viewport !== 'Small' && this.viewport !== 'XSmall';
  }
}
