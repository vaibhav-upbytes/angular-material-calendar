import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarWeekViewGridComponent } from './calendar-week-view-grid.component';
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

export const events = [{
    "start": 1634639410000,
    "end": 1634661010000,
    "title": "event16",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
},
{
    "start": 1634639410000,
    "end": 1634653810000,
    "title": "event17",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
}
    ,
{
    "start": 1634654710000,
    "end": 1634661010000,
    "title": "event18",
    "color": "#d8c6d9",
    "leftFr": 1,
    "left": 1
}];


let loader: HarnessLoader;
let component: CalendarWeekViewGridComponent;
let fixture: ComponentFixture<CalendarWeekViewGridComponent>;

describe('calendar-week-view-grid', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({ 
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [
                CalendarWeekViewGridComponent,
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
        fixture = TestBed.createComponent(CalendarWeekViewGridComponent);
        fixture.componentInstance.events$ = new BehaviorSubject<CalendarEventInput[]>(events);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture); 

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('should be able load week view grid', async () => {
        const weekGrid = await fixture.debugElement.query(By.css(".mat-grid-tile"));
        expect(weekGrid).toBeTruthy();
    });

})

