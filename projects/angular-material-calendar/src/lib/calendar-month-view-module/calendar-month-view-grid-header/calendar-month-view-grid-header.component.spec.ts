import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarMonthViewGridHeaderComponent } from './calendar-month-view-grid-header.component';
import { MaterialModule } from '../../material-modules/material.module';

let loader: HarnessLoader;
let component: CalendarMonthViewGridHeaderComponent;
let fixture: ComponentFixture<CalendarMonthViewGridHeaderComponent>;

describe('calendar-month-view-grid-header', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarMonthViewGridHeaderComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarMonthViewGridHeaderComponent);
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
        expect(harnesses.length).toEqual(7);
    });

    it('month view first tile should be monday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const first = await (await tiles[0].host()).text();
        expect(first).toEqual('Mon');
    });

    it('month view last tile should be sunday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const last = await (await tiles[6].host()).text();
        expect(last).toEqual('Sun');
    });

});

