import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarView } from './calendar-modal/calendar-view/calendar-view';
import { CalendarEventInput } from './calendar-modal/calendar-event/calendar-event-input';

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
    private store: Store<{ _view: CalendarView}> 
  ) {
    this._view$ = store.select('_view');
    this._view$.subscribe((v) => this._view = v);
    this.events = JSON.parse(`{ "data" : 
    [
    {
        "start": "2021-10-09T05:06:07",
        "end": "2021-10-09T06:06:07",
        "title": "string  string string string string string" ,
        "color": "string"
    },
    {
        "start": "2021-10-12T15:17:07",
        "end": "2021-10-12T16:11:07",
        "title": "string",
        "color": "string"
    },
    {
        "start": "2021-10-15T09:35:07",
        "end": "2021-10-15T11:40:07",
        "title": "string",
        "color": "string"
    },
    {
        "start": "2021-10-17T13:22:07",
        "end": "2021-10-17T19:22:07",
        "title": "string",
        "color": "string"
    },
    {
        "start": "2021-10-25T11:22:07",
        "end": "2021-10-25T11:22:07",
        "title": "string",
        "color": "string"
    }
    ]
}
      `).data;
  }

  ngOnInit(): void {
  }

}
