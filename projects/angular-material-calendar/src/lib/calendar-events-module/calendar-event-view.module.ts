import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import { CalendarHoursService } from '../service/calendar-hours.service';
import { 
  CalendarEventViewComponent
 } from './calendar-event-view/calendar-event-view.component';
import {
  CalendarEventWeekViewComponent
} from './calendar-event-week-view/calendar-event-view/calendar-event-week-view.component';
@NgModule({
    declarations: [
      CalendarEventViewComponent,
      CalendarEventWeekViewComponent
    ],
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [
      CalendarEventViewComponent,
      CalendarEventWeekViewComponent
    ],
    providers: [
      CalendarHoursService
    ]
  })
export class CalendarEventViewModule{}