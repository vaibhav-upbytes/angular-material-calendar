import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarDayViewHeaderComponent } from './calendar-day-view-header.component';
import { MaterialModule } from '../../material-modules/material.module';
import { DateTime } from 'luxon';

let loader: HarnessLoader;
let component: CalendarDayViewHeaderComponent;
let fixture: ComponentFixture<CalendarDayViewHeaderComponent>;

describe('calendar-day-view-grid-header', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarDayViewHeaderComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarDayViewHeaderComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('should be able load day view grid', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridListHarness);
        expect(harnesses.length).toBe(1);
    });

    it('should be able to day view grid tiles', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridTileHarness);
        expect(harnesses.length).toEqual(2);
    });

    it('day view first tile should be monday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const first = await (await tiles[0].host()).text();
        expect(first).toContain('GMT');
    });

    it('day view last tile should be sunday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const last = await (await tiles[1].host()).text();
        expect(last).toEqual(`${DateTime.now().day}${DateTime.now().weekdayLong}`);
    });

})

