import { Injectable } from '@angular/core';
import { IGroupModel } from '../interfaces/group-model';
import { IGroupServiceModel } from '../interfaces/group-service-model';
import { map, Observable } from 'rxjs';
import { BaseServices } from '../../../../shared/services/base-services';
import { IApiResponse } from '../../../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseServices<IGroupModel, IGroupServiceModel> {
  override readonly endPoint = '/victor/grupo';

  override mapDto(model: IGroupModel): IGroupServiceModel {
    return {
      id: model.id,
      nome: model.name,
    };
  }

  search(): Observable<IGroupModel[]> {
    return this.processObservable(
      this.http.get<IApiResponse<IGroupServiceModel[]>>(`${this.host}${this.endPoint}`),
    ).pipe(map(({ data }) => data.map((item) => this.mapModel(item))));
  }

  save(model: IGroupModel, id: string | number | null): Observable<IGroupModel> {
    const request = id
      ? this.http.put<IApiResponse<IGroupServiceModel[]>>(
          `${this.host}${this.endPoint}/${id}`,
          this.mapDto(model),
        )
      : this.http.post<IApiResponse<IGroupServiceModel[]>>(
          `${this.host}${this.endPoint}`,
          this.mapDto(model),
        );

    return this.processObservable(request).pipe(
      map(({ data }) => this.mapModel(data[0] ?? this.mapDto(model))),
    );
  }

  searchId(id: string | number): Observable<IGroupModel> {
    return this.processObservable(
      this.http.get<IApiResponse<IGroupServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(map(({ data }) => this.mapModel(data[0])));
  }

  delete(id: string | number): Observable<IGroupModel> {
    return this.processObservable(
      this.http.delete<IApiResponse<IGroupServiceModel[]>>(`${this.host}${this.endPoint}/${id}`),
    ).pipe(
      map(({ data }) => {
        const item = data[0];
        return item ? this.mapModel(item) : { id: Number(id), name: '' };
      }),
    );
  }

  private mapModel(model: IGroupServiceModel): IGroupModel {
    return {
      id: model.id,
      name: model.nome,
    };
  }
}
