import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarView } from './calendar-modal/calendar-view/calendar-view';

@Component({
  selector: 'lib-angular-material-calendar',
  templateUrl: './angular-material-calendar.component.html',
  styleUrls: [
    './angular-material-calendar.component.scss'
  ]
})
export class AngularMaterialCalendarComponent implements OnInit {
  _view$?: Observable<CalendarView>;
  _view?: CalendarView;
  
  constructor(
    private store: Store<{ _view: CalendarView}> 
  ) {
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
  }

  ngOnInit(): void {
  }

}
