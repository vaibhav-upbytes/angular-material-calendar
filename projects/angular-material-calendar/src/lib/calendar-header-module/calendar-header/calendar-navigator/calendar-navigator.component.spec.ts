import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../../angular-material-calendar.module';
import { CalendarNavigatorComponent } from './calendar-navigator.component';
import { MaterialModule } from '../../../material-modules/material.module';
import { DateTime } from 'luxon';

let loader: HarnessLoader;
let component: CalendarNavigatorComponent;
let fixture: ComponentFixture<CalendarNavigatorComponent>;

describe('calendar-navigator-component', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarNavigatorComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarNavigatorComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('Previous month should be displayed', async () => {
        const previous = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-previous' }));
        await previous.click();
        expect(fixture.componentInstance._currentDate!.current.month)
            .toEqual(DateTime.now().minus({ months: 1 }).month);
    });

    it('Next month should be displayed', async () => {
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-next' }));
        await next.click();
        expect(fixture.componentInstance._currentDate!.current.month)
            .toEqual(DateTime.now().plus({ months: 1 }).month);
    });

    it('Current month should be displayed', async () => {
        const today = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-today' }));
        await today.click();
        expect(fixture.componentInstance._currentDate!.current.month).toEqual(DateTime.now().month);
    });

    it('Next week should be displayed', async () => {
        fixture.componentInstance._view = { view: 'week' };
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-next' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).weekNumber).toEqual(DateTime.now().weekNumber + 1);
    });

    it('Previous week should be displayed', async () => {
        fixture.componentInstance._view = { view: 'week' };
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-previous' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).weekNumber).toEqual(DateTime.now().weekNumber - 1);
    });


    it('Next day should be displayed', async () => {
        fixture.componentInstance._view = { view: 'day' };
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-next' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).day).toEqual(DateTime.now().day + 1);
    });

    it('Previous day should be displayed', async () => {
        fixture.componentInstance._view = { view: 'day' };
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-previous' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).day).toEqual(DateTime.now().day - 1);
    });

    it('Next day should be displayed if view is undefined', async () => {
        fixture.componentInstance._view = undefined;
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-next' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).day).toEqual(DateTime.now().day + 1);
    });

    it('Previous day should be displayed if view is undefined', async () => {
        fixture.componentInstance._view = undefined;
        fixture.detectChanges();
        const next = await loader.getHarness(
            MatButtonHarness.with({ selector: '#calendar-navigator-previous' }));
        await next.click();
        fixture.detectChanges();
        const c = fixture.componentInstance._currentDate!.current;
        expect(DateTime.fromMillis(c.toMillis()).day).toEqual(DateTime.now().day - 1);
    });
});

