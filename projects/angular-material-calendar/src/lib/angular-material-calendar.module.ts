import { NgModule, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { 
  LuxonDateModule,
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS } from "@angular/material-luxon-adapter";
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { CalendarViewReducerService } from './reducer/calendar-view-reducer.service';
import { CalendarViewPortService } from './service/calendar-view-port.service';
import { DateService } from './service/date.service';
import { DateReducerService } from './reducer/date-reducer.service';
import { CalendarMonthViewModule } from './calendar-month-view-module/calendar-month-view.module';
import { CalendarHeaderModule } from './calendar-header-module/calendar-header.module';
import { CalendarWeekViewModule } from './calendar-week-view-module/calendar-week-view.module';
import { CalendarEventViewModule } from './calendar-events-module/calendar-event-view.module';
import { MaterialModule } from './material-modules/material.module';
import { CalendarDayViewModule } from './calendar-day-module/calendar-day-view.module';
import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CalendarState } from './state/calendar-state';
import { CalendarHourIndicatorModule } from './calendar-hour-indicator-module/calendar-hour-indicator.module';

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
    CalendarEventViewModule,
    CalendarHourIndicatorModule
  ],
  exports: [
    AngularMaterialCalendarComponent
  ],
  providers: [
    DateService,
    DateReducerService,
    CalendarViewReducerService,
    CalendarViewPortService,
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
    }
  ]
})
export class AngularMaterialCalendarModule { }
