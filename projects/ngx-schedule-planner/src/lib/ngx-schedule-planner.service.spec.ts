import { TestBed } from '@angular/core/testing';

import { NgxSchedulePlannerService } from './ngx-schedule-planner.service';

describe('NgxSchedulePlannerService', () => {
  let service: NgxSchedulePlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSchedulePlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
