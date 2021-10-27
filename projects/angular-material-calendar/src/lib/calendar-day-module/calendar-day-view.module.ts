import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import {
  CalendarEventViewModule
} from "../calendar-events-module/calendar-event-view.module"; 
import { CalendarHoursService } from '../service/calendar-hours.service';
import {
  CalendarDayViewComponent
} from './calendar-day-view/calendar-day-view.component';
import { 
  CalendarDayViewHeaderComponent
} from './calendar-day-header/calendar-day-view-header.component';
import {
  CalendarDayViewGridComponent
} from './calendar-day-view-grid/calendar-day-view-grid.component';
import { CalendarHourIndicatorModule } from '../calendar-hour-indicator-module/calendar-hour-indicator.module';

@NgModule({
    declarations: [
      CalendarDayViewComponent,
      CalendarDayViewHeaderComponent,
      CalendarDayViewGridComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      CalendarEventViewModule,
      CalendarHourIndicatorModule
    ],
    exports: [
      CalendarDayViewComponent
    ],
    providers: [
      CalendarHoursService
    ]
  })
export class CalendarDayViewModule{}