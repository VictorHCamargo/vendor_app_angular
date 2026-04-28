import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GroupService } from '../services/group-service';

export const groupDataResolverList: ResolveFn<any> = (route, _state) => {
  const groupService = inject(GroupService);
  return groupService.processObservable(groupService.search());
};
