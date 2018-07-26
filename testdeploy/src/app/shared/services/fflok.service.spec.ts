import { TestBed, inject } from '@angular/core/testing';

import { FflokService } from './fflok.service';
import { HttpClientModule } from '@angular/common/http';

describe('FflokService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FflokService]
    });
  });

  it('should be created', inject([FflokService], (service: FflokService) => {
    expect(service).toBeTruthy();
  }));
});
