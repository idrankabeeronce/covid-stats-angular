import { TestBed } from '@angular/core/testing';

import { ParamsModelService } from './params-model.service';

describe('ParamsModelService', () => {
  let service: ParamsModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
