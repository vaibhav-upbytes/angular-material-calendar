import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatGridListHarness } from '@angular/material/grid-list/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CALENDAR_REDUCER_TOKEN } from './angular-material-calendar.module';
import { CalendarDayViewModule } from './calendar-day-module/calendar-day-view.module';
import { CalendarEvent } from './calendar-event-source/calendar-event';
import { CalendarHeaderModule } from './calendar-header-module/calendar-header.module';
import { CalendarEventInput } from './calendar-modal/calendar-event/calendar-event-input';
import { CalendarMonthViewModule } from './calendar-month-view-module/calendar-month-view.module';
import { CalendarWeekViewModule } from './calendar-week-view-module/calendar-week-view.module';
import { MaterialModule } from './material-modules/material.module';

let loader: HarnessLoader;
let component: AngularMaterialCalendarComponent<CalendarEvent>;
let fixture: ComponentFixture<AngularMaterialCalendarComponent<CalendarEvent>>;

describe('AngularMaterialCalendarComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                CalendarHeaderModule,
                CalendarMonthViewModule,
                CalendarWeekViewModule,
                CalendarDayViewModule,
                MaterialModule
            ],
            declarations: [
                AngularMaterialCalendarComponent
            ],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AngularMaterialCalendarComponent);
        fixture.componentInstance.dataSource = new BehaviorSubject<CalendarEventInput[]>([]);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AngularMaterialCalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able load month view grid', async () => {
        component.initialView('month');
        fixture.detectChanges();
        const harnesses = await loader.getAllHarnesses(MatGridListHarness);
        expect(harnesses.length).toBe(2);
    });

    it('should be able load week view grid', async () => {
        component.initialView('week');
        fixture.detectChanges();
        const weekGrid = await fixture.debugElement.query(By.css('.mat-grid-tile'));
        expect(weekGrid).toBeTruthy();
    });

    it('should be able load day view grid', async () => {
        component.initialView('day');
        fixture.detectChanges();
        const weekGrid = await fixture.debugElement.query(By.css('.mat-grid-tile'));
        expect(weekGrid).toBeTruthy();
    });

    it('should be able load day view grid', async () => {
        component.dataSource = [];
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
