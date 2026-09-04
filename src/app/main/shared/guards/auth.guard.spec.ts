import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { describe, expect, it, vi } from 'vitest';
import { AuthStoreService } from '../services/auth-store-service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  it('permite a navegação para usuário autenticado', () => {
    const navigate = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStoreService, useValue: { isLogged: () => true } },
        { provide: Router, useValue: { navigate } },
      ],
    });

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBe(true);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('redireciona usuário não autenticado', () => {
    const navigate = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStoreService, useValue: { isLogged: () => false } },
        { provide: Router, useValue: { navigate } },
      ],
    });

    const result = TestBed.runInInjectionContext(() => authGuard(route, state));

    expect(result).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['unauthorized']);
  });
});
