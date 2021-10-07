import { NgModule, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DateReducerService } from './service/date-reducer.service';
import { DateService } from './service/date.service';

import { CalendarMonthViewModule } from './calendar-month-view-module/calendar-month-view.module';
import { CalendarHeaderModule } from './calendar-header-module/calendar-header.module';
import { CalendarWeekViewModule } from './calendar-week-view-module/calendar-week-view.module';
import { MaterialModule } from './material-modules/material.module';

import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CalendarDeviceDetailService } from './service/calendar-device-detail.service';
import { CalendarState } from './state/calendar-state';
import { CalendarViewReducerService } from './service/calendar-view-reducer.service';

export const CALENDAR_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<CalendarState>>
('Registered Reducers', {
  factory: () => {
    const viewReducer = inject(CalendarViewReducerService).getReducer();
    const dateReducer = inject(DateReducerService).getReducer();
    const reducers: ActionReducerMap<CalendarState> = {
      _date: dateReducer,
      _view: viewReducer
    };
    return reducers;
  }
});

@NgModule({
  declarations: [
    AngularMaterialCalendarComponent
  ],
  imports: [
    MatMomentDateModule,
    StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
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
    CalendarViewReducerService,
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
