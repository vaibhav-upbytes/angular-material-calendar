import { Component, OnInit } from '@angular/core';
import { CalendarDeviceDetailService } from './service/calendar-device-detail.service';
import { DateService } from './service/date.service';

@Component({
  selector: 'lib-angular-material-calendar',
  templateUrl: './angular-material-calendar.component.html',
  styleUrls: [
    './angular-material-calendar.component.scss'
  ]
})
export class AngularMaterialCalendarComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
