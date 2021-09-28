import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { DateAdapter , MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from "@angular/material-moment-adapter";
import { DateService } from './service/date.service';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/date.reducer';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';

@NgModule({
  declarations: [
    AngularMaterialCalendarComponent, CalendarHeaderComponent
  ],
  imports: [
    MatMomentDateModule, StoreModule.forRoot({ date: counterReducer }), CommonModule
  ],
  exports: [
    AngularMaterialCalendarComponent
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ]
})
export class AngularMaterialCalendarModule { }
