import { Injectable } from '@angular/core';
import { ICategoryModel} from '../interfaces/category-model';
import { ICategoryServiceModel } from '../interfaces/category-service-model';
import { map, Observable } from 'rxjs';
import { BaseServices } from '../../../../shared/services/base-services';

@Injectable({
  providedIn: 'root',
})

export class CategoryService extends BaseServices<ICategoryModel,ICategoryServiceModel> {

  endPoint = "/categorias";

  mapDto(model: ICategoryModel): ICategoryServiceModel {
    return {
      id : model.id,
      nome : model.name
    };
  }
  
  override searchId(id: string | number): Observable<ICategoryModel> {
    const result = super.searchId(id);

    return result.pipe(
      map(
        (value: any,_index) =>
        {
          const valueData = value.data[0] as ICategoryServiceModel;
          return {
            id : valueData.id,
            name : valueData.nome
          } as ICategoryModel
        }
      )
    )
  }
  
  override search(): Observable<ICategoryModel[]> {
    return super.search().pipe(
      map((value : any)=> {
        const data = value.data as ICategoryServiceModel[];

        return data.map((valueData : ICategoryServiceModel) => {
          return {
            id: valueData.id,
            name : valueData.nome
          } as ICategoryModel
        })
      })
    )
  }
  
}


// {
// data: [],
// executado: bool,
// mensagem: string
//}
