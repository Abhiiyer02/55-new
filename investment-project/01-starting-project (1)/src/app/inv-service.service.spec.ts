import { TestBed } from '@angular/core/testing';

import { InvServiceService } from './inv-service.service';

describe('InvServiceService', () => {
  let service: InvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
