import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BrandService } from '../services/brand-service';

export const brandDataResolverList: ResolveFn<any> = (_route, _state) => {
  const brandService = inject(BrandService);

  return brandService.search();
};
