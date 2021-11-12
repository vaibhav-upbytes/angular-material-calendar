import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules/material.module';
import {
    CalendarHourIndicatorComponent
} from './calendar-hour-indicator/calendar-hour-indicator.component';
import { CalendarHourIndicatorService } from '../service/calendar-hour-indicator.service';

@NgModule({
    declarations: [
        CalendarHourIndicatorComponent
    ],
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [
        CalendarHourIndicatorComponent
    ],
    providers: [
        CalendarHourIndicatorService
    ]
  })
export class CalendarHourIndicatorModule{}