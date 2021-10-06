import { NgModule, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CalendarDateState } from './state/calendar-date-state'; 
import { DateReducerService } from './service/date-reducer.service';
import { DateService } from './service/date.service';

import { CalendarMonthViewModule } from './calendar-month-view-module/calendar-month-view.module';
import { CalendarHeaderModule } from './calendar-header-module/calendar-header.module';
import { CalendarWeekViewModule } from './calendar-week-view-module/calendar-week-view.module';
import { MaterialModule } from './material-modules/material.module';

import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CalendarDeviceDetailService } from './service/calendar-device-detail.service';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<CalendarDateState>>
('Registered Reducers', {
  factory: () => {
    const serv = inject(DateReducerService);
    return serv.getReducer();
  }
});

@NgModule({
  declarations: [
    AngularMaterialCalendarComponent
  ],
  imports: [
    MatMomentDateModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    CommonModule,
    MaterialModule,
    CalendarMonthViewModule,
    CalendarWeekViewModule,
    CalendarHeaderModule
  ],
  exports: [
    AngularMaterialCalendarComponent
  ],
  providers: [
    DateService,
    DateReducerService,
    DeviceDetectorService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: DeviceDetectorService,
      useClass: CalendarDeviceDetailService
    }
  ]
})
export class AngularMaterialCalendarModule { }
