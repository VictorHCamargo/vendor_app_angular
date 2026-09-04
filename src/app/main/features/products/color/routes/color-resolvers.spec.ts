import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { ColorService } from '../services/color-service';
import { colorResolveDataForm } from './color-resolve-data-form';
import { colorResolveDataList } from './color-resolve-data-list';

describe('resolvers de cores', () => {
  const state = {} as RouterStateSnapshot;

  it('carrega a lista de cores', () => {
    const result$ = of([]);
    const search = vi.fn(() => result$);
    TestBed.configureTestingModule({
      providers: [{ provide: ColorService, useValue: { search } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      colorResolveDataList({} as ActivatedRouteSnapshot, state),
    );

    expect(search).toHaveBeenCalledOnce();
    expect(result).toBe(result$);
  });

  it('carrega a cor pelo identificador da rota', () => {
    const result$ = of({ id: 5, active: true, hexadecimal: '#ffffff' });
    const searchId = vi.fn(() => result$);
    const route = { paramMap: convertToParamMap({ id: '5' }) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: ColorService, useValue: { searchId } }],
    });

    const result = TestBed.runInInjectionContext(() => colorResolveDataForm(route, state));

    expect(searchId).toHaveBeenCalledWith('5');
    expect(result).toBe(result$);
  });

  it('redireciona quando o identificador não foi informado', () => {
    const navigate = vi.fn();
    const route = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        { provide: ColorService, useValue: {} },
        { provide: Router, useValue: { navigate } },
      ],
    });

    TestBed.runInInjectionContext(() => colorResolveDataForm(route, state));

    expect(navigate).toHaveBeenCalledWith(['color', 'form']);
  });
});
