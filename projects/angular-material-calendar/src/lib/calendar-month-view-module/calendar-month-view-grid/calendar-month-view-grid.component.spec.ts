import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { DateTime } from 'luxon';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarMonthViewGridComponent } from './calendar-month-view-grid.component';
import { MaterialModule } from '../../material-modules/material.module';
import { BehaviorSubject } from 'rxjs';
import {
    CalendarEventInput
} from '../../calendar-modal/calendar-event/calendar-event-input';
import {
    CalendarEventViewComponent
} from '../../calendar-events-module/calendar-event-view/calendar-event-view.component';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;
let component: CalendarMonthViewGridComponent;
let fixture: ComponentFixture<CalendarMonthViewGridComponent>;

describe('calendar-month-view-grid', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarMonthViewGridComponent, CalendarEventViewComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarMonthViewGridComponent);
        fixture.componentInstance.events$ = new BehaviorSubject<CalendarEventInput[]>([]);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('should be able load month view grid', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridListHarness);
        expect(harnesses.length).toBe(1);
    });

    it('should be able to month view grid tiles', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridTileHarness);
        expect(harnesses.length).toEqual(35);
    });

    it('month view first tile should be monday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const first = await (await tiles[0].host()).text();
        const date = DateTime.now().set({ day: parseInt(first, 10) });
        expect(date.weekdayLong).toEqual('Monday');
    });

    it('month view last tile should be sunday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const last = await (await tiles[34].host()).text();
        const date = DateTime.now().set({ day: parseInt(last, 10) });
        expect(date.weekdayLong).toEqual('Friday');
    });

    it('click on date should switch dates', async () => {
        const dateElement = await fixture.debugElement
            .query(By.css('.calendar-month-view-grid-date'));
        expect(dateElement).toBeTruthy();
        const clicked = dateElement.nativeElement.textContent.trim();
        dateElement.nativeElement.click();
        fixture.detectChanges();
        expect(component._currentDate?.current.day).toEqual(parseInt(clicked, 10));
    });
});

