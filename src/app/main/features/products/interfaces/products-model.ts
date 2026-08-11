export interface IProductsModel {
  id: string | number | null;
  name: string;
  describe: string;
  idCategory: number | null;
  idCoin: number | null;
  idBrand: number | null;
  idColor: number | null;
  idUnitMeasure: number | null;
  idGroup: number | null;
  priceBuy: number;
  priceSell: number;
  nameCategory?: string;
  nameCoin?: string;
  nameBrand?: string;
  nameGroup?: string;
  nameMeasure?: string;
  colorHex?: string;
}
