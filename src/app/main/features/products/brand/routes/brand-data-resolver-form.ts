import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { BrandService } from '../services/brand-service';
import { EMPTY } from 'rxjs';

export const brandDataResolverForm: ResolveFn<any> = (route, _state) => {
  const brandService = inject(BrandService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id) {
    return brandService.searchId(id);
  } else {
    router.navigate(['brand', 'form']);
    return EMPTY;
  }
};
