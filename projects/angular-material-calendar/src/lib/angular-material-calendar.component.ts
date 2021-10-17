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
        "color": "#e2e6c7"
    },
    {
        "start": "2021-10-12T15:17:07",
        "end": "2021-10-12T16:11:07",
        "title": "string",
        "color": "#e2e6c7"
    },
    {
      "start": "2021-10-14T14:35:07",
      "end": "2021-10-14T17:40:07",
      "title": "string",
      "color": "#d8c6d9"
  },
    {
        "start": "2021-10-15T15:35:07",
        "end": "2021-10-15T19:40:07",
        "title": "string",
        "color": "#d8c6d9"
    },
    {
      "start": "2021-10-15T16:35:07",
      "end": "2021-10-15T18:40:07",
      "title": "conflict",
      "color": "#d8c6d9"
  },

  {
    "start": "2021-10-15T16:35:07",
    "end": "2021-10-15T18:40:07",
    "title": "conflict1",
    "color": "#d8c6d9"
},
{
  "start": "2021-10-15T20:35:07",
  "end": "2021-10-15T21:40:07",
  "title": "conflict2",
  "color": "#d8c6d9"
},
{
  "start": "2021-10-15T19:35:07",
  "end": "2021-10-15T22:40:07",
  "title": "conflict3",
  "color": "#d8c6d9"
},
    {
        "start": "2021-10-17T13:22:07",
        "end": "2021-10-17T19:22:07",
        "title": "string",
        "color": "#eec8ca"
    },
    {
        "start": "2021-10-25T11:22:07",
        "end": "2021-10-25T11:22:07",
        "title": "string",
        "color": "#c6d3d9"
    },

    {
      "start": "2021-10-18T11:22:07",
      "end": "2021-10-24T11:22:07",
      "title": "string",
      "color": "#c6d3d9"
  }
    ]
}
      `).data;
  }

  ngOnInit(): void {
  }

}
