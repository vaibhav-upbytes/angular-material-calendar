import { NgModule, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { CalendarDateState } from './state/calendar-date-state'; 
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DateReducerService } from './service/date-reducer.service';
import { DateService } from './service/date.service';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<CalendarDateState>>('Registered Reducers', {
  factory: () => {
    const serv = inject(DateReducerService);
    return serv.getReducer();
  }
});

@NgModule({
  declarations: [
    AngularMaterialCalendarComponent, CalendarHeaderComponent
  ],
  imports: [
    MatMomentDateModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    CommonModule
  ],
  exports: [
    AngularMaterialCalendarComponent
  ],
  providers: [DateService, DateReducerService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }
  ]
})
export class AngularMaterialCalendarModule { }
