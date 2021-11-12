import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { MaterialModule } from '../../material-modules/material.module';
import { CalendarEventViewComponent } from './calendar-event-view.component';

let loader: HarnessLoader;
let component: CalendarEventViewComponent;
let fixture: ComponentFixture<CalendarEventViewComponent>;

export const events =     [{
    "start": 1634621592000,
    "end": 1634625192000,
    "title": "string  string string string string string" ,
    "color": "#e2e6c7"
}]

describe('calendar-event-view', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarEventViewComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarEventViewComponent);
        component = fixture.componentInstance;
        component.events = events;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('event card should be displayed', async () => {
        const cards = await loader.getAllHarnesses(MatCardHarness);
        expect(cards.length).toBe(1);
    });

    it('event card should be displayed', async () => {
        const cards = await loader.getAllHarnesses(MatCardHarness);
        expect(cards.length).toBe(1);
        expect(await cards[0].getSubtitleText()).toBe(component.getTitle(component.events![0]));
    });
})

