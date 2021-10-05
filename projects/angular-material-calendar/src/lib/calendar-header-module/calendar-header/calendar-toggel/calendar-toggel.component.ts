import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CalendarDate } from '../../../calendar-date/calendar-date';
import { DateService } from '../../../service/date.service';

@Component({
    selector: 'angular-material-calendar-toggel',
    templateUrl: './calendar-toggel.component.html',
    styleUrls: [
        './calendar-toggel.component.scss'
    ]
  })
export class CalendarHeaderToggelComponent {}