import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mark } from './mark';

describe('Mark', () => {
  let component: Mark;
  let fixture: ComponentFixture<Mark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mark],
    }).compileComponents();

    fixture = TestBed.createComponent(Mark);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
