import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { ProductsService } from '../services/products-service';
import { productsDataResolverForm } from './products-data-resolver-form';
import { productsDataResolverList } from './products-data-resolver-list';

describe('resolvers de produtos', () => {
  const state = {} as RouterStateSnapshot;

  it('carrega a lista de produtos', () => {
    const result$ = of([]);
    const search = vi.fn(() => result$);

    TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: { search } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      productsDataResolverList({} as ActivatedRouteSnapshot, state),
    );

    expect(search).toHaveBeenCalledOnce();
    expect(result).toBe(result$);
  });

  it('carrega o produto pelo identificador da rota', () => {
    const result$ = of({ id: 8 });
    const searchId = vi.fn(() => result$);
    const route = { paramMap: convertToParamMap({ id: '8' }) } as ActivatedRouteSnapshot;

    TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: { searchId } }],
    });

    const result = TestBed.runInInjectionContext(() => productsDataResolverForm(route, state));

    expect(searchId).toHaveBeenCalledWith('8');
    expect(result).toBe(result$);
  });

  it('redireciona para o formulário quando o identificador não existe', () => {
    const navigateByUrl = vi.fn();
    const route = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: {} },
        { provide: Router, useValue: { navigateByUrl } },
      ],
    });

    TestBed.runInInjectionContext(() => productsDataResolverForm(route, state));

    expect(navigateByUrl).toHaveBeenCalledWith('/products/form');
  });
});
