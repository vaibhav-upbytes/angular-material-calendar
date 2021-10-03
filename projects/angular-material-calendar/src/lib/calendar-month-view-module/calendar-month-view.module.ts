import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material-modules/material.module";
import {
  CalendarMonthViewGridComponent
} from "./calendar-month-view-grid/calendar-month-view-grid.component";
import { 
  CalendarMonthViewComponent
 } from './calendar-month-view/calendar-month-view.component';
import {
  CalendarMonthViewGridHeaderComponent
} from './calendar-month-view-grid-header/calendar-month-view-grid-header.component';

import { MonthViewService } from "./service/calendar-month-view.service"; 

@NgModule({
    declarations: [
        CalendarMonthViewComponent,
        CalendarMonthViewGridHeaderComponent,
        CalendarMonthViewGridComponent
    ],
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [
      CalendarMonthViewComponent
    ],
    providers: [ MonthViewService
    ]
  })
export class CalendarMonthViewModule{}