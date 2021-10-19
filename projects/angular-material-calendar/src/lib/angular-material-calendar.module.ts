import { NgModule, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { 
  LuxonDateModule,
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DateReducerService } from './reducer/date-reducer.service';
import { CalendarViewReducerService } from './reducer/calendar-view-reducer.service';
import { DateService } from './service/date.service';

import { CalendarMonthViewModule } from './calendar-month-view-module/calendar-month-view.module';
import { CalendarHeaderModule } from './calendar-header-module/calendar-header.module';
import { CalendarWeekViewModule } from './calendar-week-view-module/calendar-week-view.module';
import { CalendarEventViewModule } from './calendar-events-module/calendar-event-view.module';
import { MaterialModule } from './material-modules/material.module';
import { CalendarDayViewModule } from './calendar-day-module/calendar-day-view.module';
import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CalendarDeviceDetailService } from './service/calendar-device-detail.service';
import { CalendarState } from './state/calendar-state';

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
    LuxonDateModule,
    StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
    CommonModule,
    MaterialModule,
    CalendarMonthViewModule,
    CalendarWeekViewModule,
    CalendarHeaderModule,
    CalendarDayViewModule,
    CalendarEventViewModule
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
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: DeviceDetectorService,
      useClass: CalendarDeviceDetailService
    }
  ]
})
export class AngularMaterialCalendarModule { }
