import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PeopleService } from '../services/people-service';
import { catchError, EMPTY, map, tap } from 'rxjs';

export const peopleDataResolverForm: ResolveFn<any> = (route) => {
  const peopleService = inject(PeopleService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;
  const isNaturalRoute = route.routeConfig?.path?.includes('naturalPerson');

  return peopleService.searchId(id).pipe(
    map((person) => {
      if (!person) {
        router.navigate(['people', 'form', isNaturalRoute ? 'naturalPerson' : 'legalPerson']);
        return EMPTY;
      }

      const isNaturalPerson = person.peopleType === 'F';

      if (isNaturalPerson && !isNaturalRoute) {
        router.navigate(['people', 'form', 'naturalPerson', id]);
        return EMPTY;
      }

      if (!isNaturalPerson && isNaturalRoute) {
        router.navigate(['people', 'form', 'legalPerson', id]);
        return EMPTY;
      }

      return person;
    }),
    catchError(() => {
      router.navigate(['people', 'form', isNaturalRoute ? 'naturalPerson' : 'legalPerson']);
      return EMPTY
    })
  );
};
