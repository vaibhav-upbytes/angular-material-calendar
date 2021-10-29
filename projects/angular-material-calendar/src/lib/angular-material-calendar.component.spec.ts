import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';
import { CalendarEventInput } from './calendar-modal/calendar-event/calendar-event-input';

describe('AngularMaterialCalendarComponent', () => {
  let component: AngularMaterialCalendarComponent<CalendarEventInput>;
  let fixture: ComponentFixture<AngularMaterialCalendarComponent<CalendarEventInput>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMaterialCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
