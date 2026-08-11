import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../services/products-service';

export const productsDataResolverForm: ResolveFn<any> = (route, _state) => {
  const productsService = inject(ProductsService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (id) {
    return productsService.searchId(id);
  } else {
    router.navigateByUrl('/products/form');
    return EMPTY;
  }
};
