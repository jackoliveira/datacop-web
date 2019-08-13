import { TestBed } from '@angular/core/testing';

import { OccurrencesService } from './occurrences.service';

describe('OccurrencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccurrencesService = TestBed.get(OccurrencesService);
    expect(service).toBeTruthy();
  });
});
