import { TestBed, inject } from '@angular/core/testing';

import { AlignerService } from './aligner.service';

describe('AlignerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlignerService]
    });
  });

  it('should be created', inject([AlignerService], (service: AlignerService) => {
    expect(service).toBeTruthy();
  }));
});
