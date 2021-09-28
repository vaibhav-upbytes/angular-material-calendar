import { Component, OnInit } from '@angular/core';
import { DateService } from './service/date.service';

@Component({
  selector: 'lib-angular-material-calendar',
  template: `
    <p>
      angular-material-calendar works!
      <angular-material-calendar-header></angular-material-calendar-header>
    </p>
  `,
  styles: [
  ]
})
export class AngularMaterialCalendarComponent implements OnInit {

  constructor(private _dateservice: DateService) { 

  }

  ngOnInit(): void {
  }

}
