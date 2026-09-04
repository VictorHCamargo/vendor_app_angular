import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { BaseServices } from './base-services';

class TestService extends BaseServices<{ name: string }, { nome: string }> {
  readonly endPoint = '/test';
}

describe('BaseServices', () => {
  it('redireciona para acesso não autorizado ao receber HTTP 401', () => {
    const navigate = vi.fn();

    TestBed.configureTestingModule({
      providers: [TestService, { provide: Router, useValue: { navigate } }],
    });

    const service = TestBed.inject(TestService);
    const error = new HttpErrorResponse({ status: 401 });

    service.processObservable(throwError(() => error)).subscribe({ error: () => undefined });

    expect(navigate).toHaveBeenCalledWith(['unauthorized']);
  });

  it('exige que a conversão padrão seja sobrescrita', () => {
    TestBed.configureTestingModule({ providers: [TestService] });

    expect(() => TestBed.inject(TestService).mapDto({ name: 'Teste' })).toThrow(
      'A conversão do modelo deve ser implementada pelo serviço.',
    );
  });
});
