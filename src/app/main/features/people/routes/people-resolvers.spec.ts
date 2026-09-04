import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, of, throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { PeopleService } from '../services/people-service';
import { peopleDataResolverForm } from './people-data-resolver-form.routes';
import { peopleDataResolverList } from './people-data-resolver-list.routes';

describe('resolvers de pessoas', () => {
  const state = {} as RouterStateSnapshot;

  it('carrega pessoas físicas na lista correspondente', () => {
    const result$ = of([]);
    const searchByQuery = vi.fn(() => result$);
    const route = { routeConfig: { path: 'list/naturalPerson' } } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: PeopleService, useValue: { searchByQuery } }],
    });

    const result = TestBed.runInInjectionContext(() => peopleDataResolverList(route, state));

    expect(searchByQuery).toHaveBeenCalledWith('F');
    expect(result).toBe(result$);
  });

  it('carrega pessoas jurídicas na lista correspondente', () => {
    const result$ = of([]);
    const searchByQuery = vi.fn(() => result$);
    const route = { routeConfig: { path: 'list/legalPerson' } } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: PeopleService, useValue: { searchByQuery } }],
    });

    TestBed.runInInjectionContext(() => peopleDataResolverList(route, state));

    expect(searchByQuery).toHaveBeenCalledWith('J');
  });

  it('retorna a pessoa quando o tipo confere com a rota', async () => {
    const person = { id: 7, peopleType: 'F' };
    const searchId = vi.fn(() => of(person));
    const route = {
      paramMap: convertToParamMap({ id: '7' }),
      routeConfig: { path: 'form/naturalPerson/:id' },
    } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [{ provide: PeopleService, useValue: { searchId } }],
    });

    const result = TestBed.runInInjectionContext(() => peopleDataResolverForm(route, state));

    await expect(firstValueFrom(result)).resolves.toEqual(person);
    expect(searchId).toHaveBeenCalledWith('7');
  });

  it('redireciona a pessoa física que foi aberta em uma rota jurídica', () => {
    const navigate = vi.fn();
    const route = {
      paramMap: convertToParamMap({ id: '7' }),
      routeConfig: { path: 'form/legalPerson/:id' },
    } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        { provide: PeopleService, useValue: { searchId: () => of({ peopleType: 'F' }) } },
        { provide: Router, useValue: { navigate } },
      ],
    });

    const result = TestBed.runInInjectionContext(() => peopleDataResolverForm(route, state));
    result.subscribe();

    expect(navigate).toHaveBeenCalledWith(['people', 'form', 'naturalPerson', '7']);
  });

  it('volta ao formulário quando a busca falha', () => {
    const navigate = vi.fn();
    const route = {
      paramMap: convertToParamMap({ id: '7' }),
      routeConfig: { path: 'form/legalPerson/:id' },
    } as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        { provide: PeopleService, useValue: { searchId: () => throwError(() => new Error()) } },
        { provide: Router, useValue: { navigate } },
      ],
    });

    const result = TestBed.runInInjectionContext(() => peopleDataResolverForm(route, state));
    result.subscribe({ complete: () => undefined });

    expect(navigate).toHaveBeenCalledWith(['people', 'form', 'legalPerson']);
  });
});
