import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeactivate } from './modal-deactivate';

describe('ModalDeactivate', () => {
  let component: ModalDeactivate;
  let fixture: ComponentFixture<ModalDeactivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeactivate],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeactivate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
