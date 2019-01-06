import { TestBed } from '@angular/core/testing';

import { LimitsService } from './limits.service';

describe('LimitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitsService = TestBed.get(LimitsService);
    expect(service).toBeTruthy();
  });
});
