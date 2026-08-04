import { Injectable } from '@angular/core';
import { BaseServices } from '../../../shared/services/base-services';
import { IProductsModel } from '../interfaces/products-model';
import { IProductsServiceModel } from '../interfaces/products-service-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseServices<IProductsModel, IProductsServiceModel> {
  override endPoint = '/victor/produto/';

  override search(): Observable<IProductsModel[]> {
    this.http.get(`${this.host}${this.endPoint}`).subscribe((m) => console.log(m));

    return of([] as IProductsModel[]);
  }
}
