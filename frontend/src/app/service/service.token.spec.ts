import { TestBed } from '@angular/core/testing';

import { ServiceToken } from './service.token';

describe('ServiceToken', () => {
  let service: ServiceToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
