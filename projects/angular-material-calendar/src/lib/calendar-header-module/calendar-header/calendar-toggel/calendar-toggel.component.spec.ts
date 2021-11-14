import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    LuxonDateAdapter,
    MAT_LUXON_DATE_ADAPTER_OPTIONS
} from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../../angular-material-calendar.module';
import { CalendarHeaderToggelComponent } from './calendar-toggel.component';
import { MaterialModule } from '../../../material-modules/material.module';

let loader: HarnessLoader;
let component: CalendarHeaderToggelComponent;
let fixture: ComponentFixture<CalendarHeaderToggelComponent>;

describe('calendar-navigator-component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarHeaderToggelComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarHeaderToggelComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('Previous month should be displayed', async () => {
        const previous = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-toggel-month' }));
        await previous.click();
        expect(fixture.componentInstance._view?.view).toEqual('month');
    });

    it('Next month should be displayed', async () => {
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-toggel-week' }));
        await next.click();
        expect(fixture.componentInstance._view?.view).toEqual('week');
    });

    it('Current month should be displayed', async () => {
        const today = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-toggel-day' }));
        await today.click();
        expect(fixture.componentInstance._view?.view).toEqual('day');
    });
});

