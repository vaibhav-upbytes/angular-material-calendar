import { Component, OnInit } from '@angular/core';
import { DateService } from './service/date.service';

@Component({
  selector: 'lib-angular-material-calendar',
  template: `
    <p>
      <angular-material-calendar-header class="calendar-header"></angular-material-calendar-header>
    </p>
  `,
  styleUrls: [
    './angular-material-calendar.component.scss'
  ]
})
export class AngularMaterialCalendarComponent implements OnInit {

  constructor(private _dateservice: DateService) { 

  }

  ngOnInit(): void {
  }

}
