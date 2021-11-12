import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material-modules/material.module";
import { CalendarHeaderComponent } from "./calendar-header/calendar-header.component";
import { 
    CalendarHeaderLabelComponent 
} from "./calendar-header/calendar-label/calendar-label.component";
import { 
    CalendarNavigatorComponent
 } from "./calendar-header/calendar-navigator/calendar-navigator.component";
 import {
     CalendarHeaderToggelComponent
 } from "./calendar-header/calendar-toggel/calendar-toggel.component";
 import { DateService } from "../service/date.service";

@NgModule({
    declarations: [
        CalendarHeaderComponent,
        CalendarNavigatorComponent,
        CalendarHeaderLabelComponent,
        CalendarHeaderToggelComponent
    ],
    imports: [
      CommonModule,
      MaterialModule
    ],
    exports: [
        CalendarHeaderComponent
    ],
    providers: [ 
        DateService
    ]
  })
export class CalendarHeaderModule{}