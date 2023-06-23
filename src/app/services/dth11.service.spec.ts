import { TestBed } from '@angular/core/testing';

import { Dth11Service } from './dth11.service';

describe('Dth11Service', () => {
  let service: Dth11Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dth11Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
