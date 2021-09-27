import { TestBed } from '@angular/core/testing';

import { AngularMaterialCalendarService } from './angular-material-calendar.service';

describe('AngularMaterialCalendarService', () => {
  let service: AngularMaterialCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMaterialCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
