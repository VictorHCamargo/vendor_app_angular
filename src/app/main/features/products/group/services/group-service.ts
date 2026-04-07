import { Injectable } from '@angular/core';
import { IGroupModel } from '../interfaces/group-model';
import { IGroupServiceModel } from '../interfaces/group-service-model';
import { map , Observable, retry } from 'rxjs';
import { BaseServices } from '../../../../shared/services/base-services';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseServices<IGroupModel,IGroupServiceModel>{
  endPoint = "/grupos";

  mapDto(model: IGroupModel): IGroupServiceModel {
    return {
      id: model.id,
      nome : model.name
    }
  }

  override search(): Observable<IGroupModel[]> {
    return super.search().pipe(
      map((value: any) => {
        const data = value.data as IGroupServiceModel[];

        return data.map((valueData) => {
          return {
            id : valueData.id,
            name : valueData.nome
          } as IGroupModel
        })
      })
    )
  }

  override searchId(id: string | number): Observable<IGroupModel> {
    const result = super.searchId(id);

    return result.pipe(
      map(
        (value : any,_index) => {
          const valueData = value.data[0] as IGroupServiceModel;
          return {
            id : valueData.id,
            name : valueData.nome
          } as IGroupModel
        }
      )
    )
  }
}
