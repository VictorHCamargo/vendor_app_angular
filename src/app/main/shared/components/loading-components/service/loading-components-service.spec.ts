import { TestBed } from '@angular/core/testing';

import { LoadingComponentsService } from './loading-components-service';

describe('LoadingComponentsService', () => {
  let service: LoadingComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
