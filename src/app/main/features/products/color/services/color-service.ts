import { Injectable } from '@angular/core';
import { BaseServices } from '../../../../shared/services/base-services';
import { IColorModel } from '../interfaces/color-model';
import { IColorServiceModel } from '../interfaces/color-service-model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends BaseServices<IColorModel, IColorServiceModel> {
  override endPoint = '/victor/cor';

  override search(): Observable<IColorModel[]> {
    const results = this.http.get(`${this.host}${this.endPoint}`).pipe(
      map((value: any) => {
        const data = value.data;

        return data.map(
          (valueData: IColorServiceModel) =>
            ({
              id: valueData.id,
              active: valueData.ativo == 'A' ? true : false,
              hexadecimal: valueData.hexadecimal,
            }) as IColorModel,
        );
      }),
    );

    return results;
  }

  override searchId(id: string | number): Observable<IColorModel> {
    const results = this.http.get(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = value.data;

        return {
          id: data.id,
          active: data.ativo == 'A' ? true : false,
          hexadecimal: data.hexadecimal,
        } as IColorModel;
      }),
    );

    return results;
  }

  override delete(id: string | number): Observable<IColorModel> {
    const results = this.http.delete(`${this.host}${this.endPoint}/${id}`).pipe(
      map((value: any) => {
        const [data] = value.data;
        return {
          id: data.id,
        } as IColorModel;
      }),
    );

    return results;
  }

  override save(model: IColorModel, id: string | number | null): Observable<IColorModel> {
    if (id) {
      const results = this.http.put(`${this.host}${this.endPoint}/${id}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const [data] = value.data;
          return {
            id: data.id,
          } as IColorModel;
        }),
      );
      return results;
    } else {
      const results = this.http.post(`${this.host}${this.endPoint}`, this.mapDto(model)).pipe(
        map((value: any) => {
          const [data] = value.data;
          return {
            id: data.id,
          } as IColorModel;
        }),
      );
      return results;
    }
  }

  override mapDto(model: IColorModel): any {
    return {
      hexadecimal: model.hexadecimal,
      ativo: model.active ? 'A' : 'I',
    };
  }
}
