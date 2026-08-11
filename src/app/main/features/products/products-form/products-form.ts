import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { maxLength, min, minLength, required } from '@angular/forms/signals';
import { BaseForms } from '../../../shared/class/base-form';
import { FormInput } from '../../../shared/components/form-input/form-input';
import { FormActions } from '../../../shared/components/form-actions/form-actions';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { TOpitons } from '../../../shared/components/form-input/interfaces/form-input-config';
import { IProductsModel } from '../interfaces/products-model';
import { ProductsService } from '../services/products-service';
import { GroupService } from '../group/services/group-service';
import { BrandService } from '../brand/services/brand-service';
import { ColorService } from '../color/services/color-service';

interface ISelectSource {
  id: string | number | null;
  name: string;
}

@Component({
  selector: 'app-products-form',
  imports: [FormInput, TranslatePipe, FormActions],
  templateUrl: './products-form.html',
  styleUrl: './products-form.scss',
})
export class ProductsForm extends BaseForms<IProductsModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);
  private groupService = inject(GroupService);
  private brandService = inject(BrandService);
  private colorService = inject(ColorService);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);

  private groups = signal<ISelectSource[]>([]);
  private brands = signal<ISelectSource[]>([]);
  private colors = signal<{ id: string | number | null; hexadecimal: string }[]>([]);
  private categories = signal<ISelectSource[]>([]);
  private coins = signal<ISelectSource[]>([]);
  private measures = signal<ISelectSource[]>([]);

  loadingOptions = signal<boolean>(true);

  selectGroups = computed<TOpitons[]>(() => this.toOptions(this.groups()));
  selectBrands = computed<TOpitons[]>(() => this.toOptions(this.brands()));
  selectCategories = computed<TOpitons[]>(() => this.toOptions(this.categories()));
  selectCoins = computed<TOpitons[]>(() => this.toOptions(this.coins()));
  selectMeasures = computed<TOpitons[]>(() => this.toOptions(this.measures()));
  selectColors = computed<TOpitons[]>(() => [
    { value: '', data: this.t('PRODUCT.SELECT_PLACEHOLDER') },
    ...this.colors().map((color) => ({ value: String(color.id), data: color.hexadecimal })),
  ]);

  constructor() {
    super();

    this.createForm(
      this.createModel(
        {
          id: null,
          name: '',
          describe: '',
          idCategory: null,
          idCoin: null,
          idBrand: null,
          idColor: null,
          idUnitMeasure: null,
          idGroup: null,
          priceBuy: 0,
          priceSell: 0,
        },
        this.route,
      ),
      (path) => {
        required(path.name, { message: this.t('VALIDATION.REQUIRED') });
        minLength(path.name, 3, { message: this.t('VALIDATION.MIN_LENGTH') });
        maxLength(path.name, 64, { message: this.t('VALIDATION.MAX_LENGTH') });

        required(path.describe, { message: this.t('VALIDATION.REQUIRED') });
        minLength(path.describe, 3, { message: this.t('VALIDATION.MIN_LENGTH') });
        maxLength(path.describe, 120, { message: this.t('VALIDATION.MAX_LENGTH') });

        required(path.priceBuy, { message: this.t('VALIDATION.REQUIRED') });
        min(path.priceBuy, 0.01, { message: this.t('VALIDATION.MIN_PRICE') });

        required(path.priceSell, { message: this.t('VALIDATION.REQUIRED') });
        min(path.priceSell, 0.01, { message: this.t('VALIDATION.MIN_PRICE') });
      },
    );

    this.loadOptions();
  }

  override onCancel(): void {
    this.router.navigate(['products', 'list']);
  }

  override onSave(): void {
    this.saving.set(true);
    this.service.save(this.model(), this.model().id).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.show(this.t(this.model().id ? 'SAVE.UPDATED' : 'SAVE.CREATED'), 'success');
        this.router.navigate(['products', 'list']);
      },
      error: () => {
        this.saving.set(false);
        this.toast.show(this.t('SAVE.ERROR'), 'danger');
      },
    });
  }

  get formName() {
    return this.formData.name;
  }
  get formDescribe() {
    return this.formData.describe;
  }
  get formPriceBuy() {
    return this.formData.priceBuy;
  }
  get formPriceSell() {
    return this.formData.priceSell;
  }
  get formIdGroup() {
    return this.formData.idGroup;
  }
  get formIdCategory() {
    return this.formData.idCategory;
  }
  get formIdCoin() {
    return this.formData.idCoin;
  }
  get formIdBrand() {
    return this.formData.idBrand;
  }
  get formIdColor() {
    return this.formData.idColor;
  }
  get formIdUnitMeasure() {
    return this.formData.idUnitMeasure;
  }

  private loadOptions(): void {
    forkJoin({
      groups: this.groupService.search(),
      brands: this.brandService.search(),
      colors: this.colorService.search(),
      categories: this.service.searchCategories(),
      coins: this.service.searchCoins(),
      measures: this.service.searchMeasures(),
    }).subscribe({
      next: (result) => {
        this.groups.set(result.groups);
        this.brands.set(result.brands);
        this.colors.set(result.colors.filter((color) => color.active));
        this.categories.set(result.categories);
        this.coins.set(result.coins);
        this.measures.set(result.measures);
        this.loadingOptions.set(false);
      },
      error: () => {
        this.toast.show(this.t('PRODUCT.LOAD_OPTIONS_ERROR'), 'danger');
        this.loadingOptions.set(false);
      },
    });
  }

  private toOptions(list: ISelectSource[]): TOpitons[] {
    return [
      { value: '', data: this.t('PRODUCT.SELECT_PLACEHOLDER') },
      ...list.map((item) => ({ value: String(item.id), data: item.name })),
    ];
  }

  private t(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.${key}`);
  }
}
