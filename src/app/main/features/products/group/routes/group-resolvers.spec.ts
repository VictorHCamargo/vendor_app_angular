import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { GroupService } from '../services/group-service';
import { groupDataResolverForm } from './group-data-resolver-form';
import { groupDataResolverList } from './group-data-resolver-list';

describe('resolvers de grupos', () => {
  const state = {} as RouterStateSnapshot;

  it('processa o carregamento da lista de grupos', () => {
    const result$ = of([]);
    const search = vi.fn(() => result$);
    const processObservable = vi.fn((value) => value);
    TestBed.configureTestingModule({
      providers: [{ provide: GroupService, useValue: { processObservable, search } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      groupDataResolverList({} as ActivatedRouteSnapshot, state),
    );

    expect(search).toHaveBeenCalledOnce();
    expect(processObservable).toHaveBeenCalledWith(result$);
    expect(result).toBe(result$);
  });

  it('carrega o grupo pelo identificador da rota', () => {
    const result$ = of({ id: 2, name: 'Grupo' });
    const searchId = vi.fn(() => result$);
    const route = { paramMap: convertToParamMap({ id: '2' }) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: GroupService, useValue: { searchId } }],
    });

    const result = TestBed.runInInjectionContext(() => groupDataResolverForm(route, state));

    expect(searchId).toHaveBeenCalledWith('2');
    expect(result).toBe(result$);
  });

  it('redireciona quando o identificador não foi informado', () => {
    const navigateByUrl = vi.fn();
    const route = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        { provide: GroupService, useValue: {} },
        { provide: Router, useValue: { navigateByUrl } },
      ],
    });

    TestBed.runInInjectionContext(() => groupDataResolverForm(route, state));

    expect(navigateByUrl).toHaveBeenCalledWith('/group/form');
  });
});
