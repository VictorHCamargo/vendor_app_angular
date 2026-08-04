import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products-service';

export const productsDataResolverList: ResolveFn<any> = (_route, _state) => {
  const productsService = inject(ProductsService);

  return productsService.search();
};
