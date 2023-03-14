import { TestBed } from '@angular/core/testing';

import { UiassetService } from './services';

describe('UiassetService', () => {
  let service: UiassetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiassetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
