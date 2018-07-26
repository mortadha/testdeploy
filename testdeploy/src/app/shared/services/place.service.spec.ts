import { TestBed, inject } from '@angular/core/testing';

import { PlaceService } from './place.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PlaceService]
    });
  });

  it('should be created', inject([PlaceService], (service: PlaceService) => {
    expect(service).toBeTruthy();
  }));
});
