import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarDayViewGridComponent } from './calendar-day-view-grid.component';
import {
    CalendarHourIndicatorComponent
} from '../../calendar-hour-indicator-module/calendar-hour-indicator/calendar-hour-indicator.component';
import {
    CalendarEventFullViewComponent
} from '../../calendar-events-module/calendar-event-full-view/calendar-event-full-view.component';
import { MaterialModule } from '../../material-modules/material.module';
import { BehaviorSubject } from 'rxjs';
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;
let component: CalendarDayViewGridComponent;
let fixture: ComponentFixture<CalendarDayViewGridComponent>;

describe('calendar-day-view-grid', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [
                CalendarDayViewGridComponent,
                CalendarEventFullViewComponent,
                CalendarHourIndicatorComponent
            ],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarDayViewGridComponent);
        fixture.componentInstance.events$ = new BehaviorSubject<CalendarEventInput[]>([]);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture); 

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('should be able load day view grid', async () => {
        const weekGrid = await fixture.debugElement.query(By.css(".mat-grid-tile"));
        expect(weekGrid).toBeTruthy();
    });

})

