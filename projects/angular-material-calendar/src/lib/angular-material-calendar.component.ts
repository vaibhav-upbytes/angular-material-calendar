import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarView } from './calendar-modal/calendar-view/calendar-view';
import { CalendarEventInput } from './calendar-modal/calendar-event/calendar-event-input';
import { CalendarViewPortService } from './service/calendar-view-port.service';
import { CalendarServiceConfig } from './service/calendar-config.service';
import { day, month, week } from './actions/calendar-view.action';

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
  @Input()
  events?: CalendarEventInput[];

  constructor(
    private store: Store<{ _view: CalendarView }>,
    private calendarViewPortService: CalendarViewPortService,
    private calendarConfigService: CalendarServiceConfig
  ) {
    this.initialView(this.calendarConfigService.view!);
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
  }

  ngOnInit(): void {
    this.calendarViewPortService.viewportResize();
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

  initialView(view: string) {
    switch (view) {
      case 'month':
        this.month();
        break;
      case 'week':
        this.week();
        break;
      case 'day':
        this.day();
        break;
      default:
        this.month();
        break;
    }
  }

}


