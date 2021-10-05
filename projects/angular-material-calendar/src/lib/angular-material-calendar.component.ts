import { Component, OnInit } from '@angular/core';
import { DateService } from './service/date.service';

@Component({
  selector: 'lib-angular-material-calendar',
  templateUrl: './angular-material-calendar.component.html',
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
