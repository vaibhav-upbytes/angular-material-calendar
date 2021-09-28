import { Component, OnInit } from '@angular/core';
import { DateService } from './service/date.service';

@Component({
  selector: 'lib-angular-material-calendar',
  template: `
    <p>
      angular-material-calendar works!
    </p>
  `,
  styles: [
  ]
})
export class AngularMaterialCalendarComponent implements OnInit {

  constructor(private _dateservice: DateService) { 
    console.log("callewd");
  }

  ngOnInit(): void {
  }

}
