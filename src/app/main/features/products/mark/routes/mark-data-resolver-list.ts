import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { MarkService } from "../services/mark-service";

export const markDataResolverList : ResolveFn<any> = (route,_state) => {
  const markService = inject(MarkService);

  return markService.search();
}
