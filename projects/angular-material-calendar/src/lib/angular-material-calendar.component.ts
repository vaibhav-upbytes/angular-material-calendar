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
        "start": 1634621592000,
        "end": 1634625192000,
        "title": "string  string string string string string" ,
        "color": "#e2e6c7"
    },
    {
        "start": 1634743992000,
        "end": 1634747592000,
        "title": "event1",
        "color": "#e2e6c7"
    },
    {
      "start": 1634826792000,
      "end": 1634833992000,
      "title": "event2",
      "color": "#d8c6d9"
  },
    {
        "start": 1634995992000,
        "end": 1635010392000,
        "title": "event3",
        "color": "#d8c6d9"
    },
    



  {
    "start": 1634743992000,
    "end": 1634747592000,
    "title": "event4",
    "color": "#e2e6c7"
},
{
  "start": 1634826792000,
  "end": 1634833992000,
  "title": "event5",
  "color": "#d8c6d9"
},
{
    "start": 1634995992000,
    "end": 1635010392000,
    "title": "event6",
    "color": "#d8c6d9"
},



{
  "start": 1634743992000,
  "end": 1634747592000,
  "title": "event7",
  "color": "#e2e6c7"
},
{
"start": 1634826792000,
"end": 1634833992000,
"title": "event8",
"color": "#d8c6d9"
},
{
  "start": 1634995992000,
  "end": 1635010392000,
  "title": "event9",
  "color": "#d8c6d9"
},



{
  "start": 1634743992000,
  "end": 1634747592000,
  "title": "event10",
  "color": "#e2e6c7"
},
{
"start": 1634826792000,
"end": 1634833992000,
"title": "event11",
"color": "#d8c6d9"
},
{
  "start": 1634995992000,
  "end": 1635010392000,
  "title": "event12",
  "color": "#d8c6d9"
},



{
  "start": 1634743992000,
  "end": 1634747592000,
  "title": "event13",
  "color": "#e2e6c7"
},
{
"start": 1634826792000,
"end": 1634833992000,
"title": "event14",
"color": "#d8c6d9"
},
{
  "start": 1634995992000,
  "end": 1635010392000,
  "title": "event15",
  "color": "#d8c6d9"
},

{
  "start": 1634639410000,
  "end": 1634661010000,
  "title": "event16",
  "color": "#d8c6d9"
  },
  {
    "start": 1634639410000,
    "end": 1634653810000,
    "title": "event17",
    "color": "#d8c6d9"
  }
  ,
  {
    "start": 1634654710000,
    "end": 1634661010000,
    "title": "event18",
    "color": "#d8c6d9"
  }
    ]
}
      `).data;
  }

  ngOnInit(): void {
  }

}
