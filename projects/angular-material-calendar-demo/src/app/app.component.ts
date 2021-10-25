import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-material-calendar-demo';
  events: [];

  constructor() {
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

  ,
  {
    "start": 1634581620000,
    "end": 1634754420000,
    "title": "multiple event19",
    "color": "#d8c6d9"
  }

  ,
  {
    "start": 1634840820000,
    "end": 1635100020000,
    "title": "multiple event20",
    "color": "#d8c6d9"
  }
    ]
}
      `).data;
  }
}
