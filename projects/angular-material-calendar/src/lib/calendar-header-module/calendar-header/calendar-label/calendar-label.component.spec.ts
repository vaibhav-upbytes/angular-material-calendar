
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { DateTime } from 'luxon';
import { CALENDAR_REDUCER_TOKEN } from '../../../angular-material-calendar.module';
import { CalendarHeaderLabelComponent } from './calendar-label.component';

let component: CalendarHeaderLabelComponent;
let fixture: ComponentFixture<CalendarHeaderLabelComponent>;

describe('calendar-header-label', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(CALENDAR_REDUCER_TOKEN)
            ],
            declarations: [CalendarHeaderLabelComponent],
            providers: [
                {
                    provide: DateAdapter,
                    useClass: LuxonDateAdapter,
                    deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS]
                }
            ]

        }).compileComponents();
        fixture = TestBed.createComponent(CalendarHeaderLabelComponent);
        component = fixture.componentInstance;
    });

    it('should work', async () => {
        expect(component).toBeTruthy();
    });

    it('label should show month and year', async () => {
        expect(component.label).toEqual(`${DateTime.now().monthLong} ${DateTime.now().year}`);
    });
});

