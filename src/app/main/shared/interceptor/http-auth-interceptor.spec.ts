import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { AuthStoreService } from '../services/auth-store-service';
import { HttpAuthInterceptor } from './http-auth-interceptor';

describe('HttpAuthInterceptor', () => {
  const callInterceptor = async (url: string, token: string) => {
    const next = vi.fn((request: HttpRequest<unknown>) => of(new HttpResponse({ body: request })));

    TestBed.configureTestingModule({
      providers: [{ provide: AuthStoreService, useValue: { getToken: () => token } }],
    });

    await firstValueFrom(
      TestBed.runInInjectionContext(() => HttpAuthInterceptor(new HttpRequest('GET', url), next)),
    );

    return { next, request: next.mock.calls[0][0] as HttpRequest<unknown> };
  };

  it('adiciona o token Bearer às requisições autenticadas', async () => {
    const { next, request } = await callInterceptor('/products', 'token-seguro');

    expect(next).toHaveBeenCalledOnce();
    expect(request.headers.get('Authorization')).toBe('Bearer token-seguro');
  });

  it('não adiciona token na autenticação', async () => {
    const { request } = await callInterceptor('/login', 'token-seguro');

    expect(request.headers.has('Authorization')).toBe(false);
  });

  it('não adiciona token quando ele não existe', async () => {
    const { request } = await callInterceptor('/products', '');

    expect(request.headers.has('Authorization')).toBe(false);
  });
});
