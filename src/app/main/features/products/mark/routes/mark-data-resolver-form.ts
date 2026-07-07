import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { MarkService } from '../services/mark-service';
import { EMPTY } from 'rxjs';

export const markDataResolverForm: ResolveFn<any> = (route, _state) => {
  const markService = inject(MarkService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id) {
    return markService.searchId(id);
  } else {
    router.navigate(['mark', 'form']);
    return EMPTY;
  }
};
