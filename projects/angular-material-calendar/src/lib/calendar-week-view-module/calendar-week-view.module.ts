import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import { CalendarWeekViewComponent } from './calendar-week-view/calendar-week-view.component';
import { CalendarWeekViewGridComponent } from './calendar-month-view-grid/calendar-week-view-grid.component';
import { CalendarHoursService } from '../service/calendar-hours.service';

@NgModule({
    declarations: [
      CalendarWeekViewComponent,
      CalendarWeekViewGridComponent
    ],
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [
      CalendarWeekViewComponent
    ],
    providers: [
      CalendarHoursService
    ]
  })
export class CalendarWeekViewModule{}