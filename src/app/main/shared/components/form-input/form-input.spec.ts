import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { FormInput } from './form-input';

describe('FormInput', () => {
  it('é criado sem executar o template antes dos inputs obrigatórios serem definidos', () => {
    TestBed.configureTestingModule({ imports: [FormInput] });
    const fixture: ComponentFixture<FormInput<unknown>> = TestBed.createComponent(
      FormInput<unknown>,
    );

    expect(fixture.componentInstance).toBeTruthy();
  });
});
