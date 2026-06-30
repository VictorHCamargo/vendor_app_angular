import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponents } from './loading-components';

describe('LoadingComponents', () => {
  let component: LoadingComponents;
  let fixture: ComponentFixture<LoadingComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
