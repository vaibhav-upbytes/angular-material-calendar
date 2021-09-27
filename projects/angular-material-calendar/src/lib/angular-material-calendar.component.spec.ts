import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialCalendarComponent } from './angular-material-calendar.component';

describe('AngularMaterialCalendarComponent', () => {
  let component: AngularMaterialCalendarComponent;
  let fixture: ComponentFixture<AngularMaterialCalendarComponent>;

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
