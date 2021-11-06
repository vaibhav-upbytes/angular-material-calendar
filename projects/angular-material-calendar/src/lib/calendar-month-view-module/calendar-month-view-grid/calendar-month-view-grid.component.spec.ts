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
import { CalendarEventInput } from '../../calendar-modal/calendar-event/calendar-event-input';
import { CalendarEventViewComponent } from '../../calendar-events-module/calendar-event-view/calendar-event-view.component';

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
        let date = DateTime.now().set({ day: parseInt(first) });
        expect(date.weekdayLong).toEqual('Monday');
    });

    it('month view last tile should be sunday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const last = await (await tiles[34].host()).text();
        let date = DateTime.now().set({ day: parseInt(last) });
        expect(date.weekdayLong).toEqual('Friday');
    });

    // it('should work', async () => {
    //     const footerLoader = await loader.getChildLoader('.calendar-month-view-grid-date');
    //     expect(footerLoader).toBeTruthy();

    // });
})

