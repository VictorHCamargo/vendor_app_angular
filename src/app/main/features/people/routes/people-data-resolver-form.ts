import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { ILegalPerson, INaturalPerson, IPersonModel, TPersonType } from '../interfaces/person-model';

function isPersonType(params: string): params is TPersonType {
  return params === 'F' || params === 'J';
}

function errorType(message: string, toastService: ToastService, router: Router) {
  toastService.show(message, 'danger');
  router.navigateByUrl('');
  return EMPTY;
}

function modelDTOType(people: TPersonType): IPersonModel {
  if (people == 'F') {
    return {
      id: null,
      name: '',
      nickname: '',
      active: 'A',
      federalDocument: '',
      peopleType: people,
      stateDocument: '',
      age: 0,
      gender: 'M',
      bond: {
        id: null,
      },
    } as INaturalPerson;
  } else {
    return {
      id: null,
      name: '',
      nickname: '',
      active: 'A',
      federalDocument: '',
      peopleType: people,
      stateDocument: '',
    } as ILegalPerson;
  }
}

export const peopleDataResolverForm: ResolveFn<any> = (route, _state) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  const people = route.paramMap.get('type');
  if (people) {
    if (isPersonType(people)) {
      return modelDTOType(people)
    } else {
      return errorType('Tipo pessoa desconhecido!', toastService, router);
    }
  } else {
    return errorType('Tipo pessoa nao definido!', toastService, router);
  }
};
