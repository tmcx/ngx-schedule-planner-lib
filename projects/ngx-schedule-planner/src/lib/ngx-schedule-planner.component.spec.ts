import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSchedulePlannerComponent } from './ngx-schedule-planner.component';

describe('NgxSchedulePlannerComponent', () => {
  let component: NgxSchedulePlannerComponent;
  let fixture: ComponentFixture<NgxSchedulePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSchedulePlannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSchedulePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
