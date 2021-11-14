import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import { CalendarHoursService } from '../service/calendar-hours.service';
import {
  CalendarEventViewComponent
} from './calendar-event-view/calendar-event-view.component';
import {
  CalendarEventFullViewComponent
} from './calendar-event-full-view/calendar-event-full-view.component';
import {
  CalendarEventDialog
} from './calendar-event-dialog-view/calendar-event-dialog.component';
@NgModule({
  declarations: [
    CalendarEventViewComponent,
    CalendarEventFullViewComponent,
    CalendarEventDialog
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CalendarEventViewComponent,
    CalendarEventFullViewComponent
  ],
  providers: [
    CalendarHoursService
  ]
})
export class CalendarEventViewModule { }
