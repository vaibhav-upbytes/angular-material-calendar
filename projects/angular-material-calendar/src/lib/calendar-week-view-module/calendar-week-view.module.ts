import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import { CalendarHoursService } from '../service/calendar-hours.service';
import { CalendarWeekViewComponent } from './calendar-week-view/calendar-week-view.component';
import {
  CalendarWeekViewGridComponent
} from './calendar-week-view-grid/calendar-week-view-grid.component';
import { 
  CalendarWeekViewHeaderComponent
} from './calendar-week-view-header/calendar-week-view-header.component';
import {
  CalendarEventViewModule
} from '../calendar-events-module/calendar-event-view.module';

@NgModule({
    declarations: [
      CalendarWeekViewComponent,
      CalendarWeekViewGridComponent,
      CalendarWeekViewHeaderComponent
    ],
    imports: [
      CommonModule,
      MaterialModule,
      CalendarEventViewModule
    ],
    exports: [
      CalendarWeekViewComponent
    ],
    providers: [
      CalendarHoursService
    ]
  })
export class CalendarWeekViewModule{}