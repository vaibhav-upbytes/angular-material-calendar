import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { CALENDAR_REDUCER_TOKEN } from '../../angular-material-calendar.module';
import { MaterialModule } from '../../material-modules/material.module';
import { CalendarEventFullViewComponent } from './calendar-event-full-view.component';
import { By } from '@angular/platform-browser';

let loader: HarnessLoader;
let rootLoader: HarnessLoader;
let component: CalendarEventFullViewComponent;
let fixture: ComponentFixture<CalendarEventFullViewComponent>;

export const event = {
    "start": 1634621592000,
    "end": 1634625192000,
    "title": "string  string string string string string",
    "color": "#e2e6c7"
};

describe('calendar-event-full-view', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN),
                MaterialModule
            ],
            declarations: [CalendarEventFullViewComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarEventFullViewComponent);
        component = fixture.componentInstance;
        component.event = event;
        fixture.detectChanges();
        rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
        loader = TestbedHarnessEnvironment.loader(fixture);

    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('event card should be displayed', async () => {
        const cards = await loader.getAllHarnesses(MatCardHarness);
        expect(cards.length).toBe(1);
    });

    it('event full card should be displayed', async () => {
        const cards = await loader.getAllHarnesses(MatCardHarness);
        expect(cards.length).toBe(1);
        expect(await cards[0].getSubtitleText()).toBe(component.time!);
        expect(await cards[0].getText()).toBe(`${component.time}${component.event?.title!}`);
    });

    it('should load harness for dialog', async () => {
        fixture.componentInstance.openEventDialog();
        fixture.detectChanges();
        const dialogs = await rootLoader.getHarness(MatDialogHarness);
        expect(dialogs).toBeTruthy();
        dialogs.close();
        fixture.detectChanges();
        expect(dialogs).toBeTruthy();      
    });
})

