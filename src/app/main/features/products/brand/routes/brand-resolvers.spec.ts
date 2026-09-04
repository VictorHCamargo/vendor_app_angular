import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { BrandService } from '../services/brand-service';
import { brandDataResolverForm } from './brand-data-resolver-form';
import { brandDataResolverList } from './brand-data-resolver-list';

describe('resolvers de marcas', () => {
  const state = {} as RouterStateSnapshot;

  it('carrega a lista de marcas', () => {
    const result$ = of([]);
    const search = vi.fn(() => result$);
    TestBed.configureTestingModule({
      providers: [{ provide: BrandService, useValue: { search } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      brandDataResolverList({} as ActivatedRouteSnapshot, state),
    );

    expect(search).toHaveBeenCalledOnce();
    expect(result).toBe(result$);
  });

  it('carrega a marca pelo identificador da rota', () => {
    const result$ = of({ id: 3, name: 'Marca' });
    const searchId = vi.fn(() => result$);
    const route = { paramMap: convertToParamMap({ id: '3' }) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: BrandService, useValue: { searchId } }],
    });

    const result = TestBed.runInInjectionContext(() => brandDataResolverForm(route, state));

    expect(searchId).toHaveBeenCalledWith('3');
    expect(result).toBe(result$);
  });

  it('redireciona quando o identificador não foi informado', () => {
    const navigate = vi.fn();
    const route = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        { provide: BrandService, useValue: {} },
        { provide: Router, useValue: { navigate } },
      ],
    });

    TestBed.runInInjectionContext(() => brandDataResolverForm(route, state));

    expect(navigate).toHaveBeenCalledWith(['brand', 'form']);
  });
});
