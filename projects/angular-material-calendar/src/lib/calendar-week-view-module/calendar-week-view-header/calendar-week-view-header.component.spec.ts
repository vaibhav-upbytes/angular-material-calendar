import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view-header.component';
import { MaterialModule } from '../../material-modules/material.module';
import { DateTime } from 'luxon';

let loader: HarnessLoader;
let component: CalendarWeekViewHeaderComponent;
let fixture: ComponentFixture<CalendarWeekViewHeaderComponent>;

describe('calendar-week-view-grid-header', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarWeekViewHeaderComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarWeekViewHeaderComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('should be able load week view grid', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridListHarness);
        expect(harnesses.length).toBe(1);
    });

    it('should be able to week view grid tiles', async () => {
        const harnesses = await loader.getAllHarnesses(MatGridTileHarness);
        expect(harnesses.length).toEqual(8);
    });

    it('week view first tile should be monday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const first = await (await tiles[0].host()).text();
        expect(first).toContain('GMT');
    });

    it('week view last tile should be sunday', async () => {
        const tiles = await loader.getAllHarnesses(MatGridTileHarness);
        const last = await (await tiles[7].host()).text();
        expect(last).toContain('Sun');
    });

})

