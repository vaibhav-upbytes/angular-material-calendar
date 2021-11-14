import { TestBed } from '@angular/core/testing';
import { CalendarConfig } from '../../calendar-modal/calendar-config/calendar-config';
import { CalendarServiceConfig } from '../calendar-config.service';

export const config = {
    'format': 'DD/MM/YYYY',
    'local': 'en',
    'view': 'month'
};

let calendarConfigService: CalendarServiceConfig;
describe('calendar-event-conflict', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: CalendarConfig, useValue: config }
            ]
        });
        calendarConfigService = TestBed.inject(CalendarServiceConfig);

    });

    it('should be able to detect config service', () => {
        expect(calendarConfigService).toBeTruthy();
    });

    it('should be able to get format', () => {
        expect(calendarConfigService.format).toEqual(config.format);
    });

    it('should be able to get local', () => {
        expect(calendarConfigService.local).toEqual(config.local);
    });

    it('should be able to get view', () => {
        expect(calendarConfigService.view).toEqual(config.view);
    });
});
