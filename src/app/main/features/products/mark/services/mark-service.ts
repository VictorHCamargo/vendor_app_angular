import { Injectable } from '@angular/core';
import { BaseServices } from '../../../../shared/services/base-services';
import { IMarkModel } from '../interfaces/mark-model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkService extends BaseServices<IMarkModel, any> {
  override endPoint: string = '/victor/marca';

  override search(): Observable<IMarkModel[]> {
    const results = this.http.get(`${this.host}${this.endPoint}`).pipe(
      map((value: any) => {
        const data = value.data;
        return data.map(
          (valueData: any) =>
            ({
              id: valueData.id,
              name: valueData.nome,
            }) as IMarkModel,
        );
      }),
    );

    return results;
  }

  override searchId(id: string | number): Observable<IMarkModel> {
    const results = this.http.get(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = value.data;

        return {
          id: data.id,
          name: data.nome,
        } as IMarkModel;
      }),
    );

    return results;
  }

  override save(model: IMarkModel, id: string | number | null): Observable<IMarkModel> {
    if (id) {
      const results = this.http.put(`${this.host}${this.endPoint}/${id}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const data = value.data;
          return {
            id: data.id,
          } as IMarkModel;
        }),
      );

      return results;
    } else {
      const results = this.http.post(`${this.host}${this.endPoint}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const data = value.data;
          return {
            id: data.id,
          } as IMarkModel;
        }),
      );

      return results;
    }
  }

  override delete(id: string | number): Observable<IMarkModel> {
    const results = this.http.delete(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const data = value.data;
        return {
          id: data.id,
        } as IMarkModel;
      }),
    );

    return results;
  }

  override mapDto(model: IMarkModel): any {
    return {
      id: model.id,
      nome: model.name,
    };
  }
}
