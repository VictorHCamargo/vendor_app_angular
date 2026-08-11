import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { BaseList } from '../../../shared/class/base-list';
import { Modal } from '../../../shared/components/modal/modal';
import { ProductDeleteModal } from '../../../shared/components/product-delete-modal/product-delete-modal';
import { Table } from '../../../shared/components/table/table';
import { ToastService } from '../../../shared/components/toast-messages/services/toast-service';
import { IProductsModel } from '../interfaces/products-model';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-products-list',
  imports: [TranslatePipe, Table, Modal, ProductDeleteModal],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList extends BaseList<IProductsModel> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);

  private modalOpen = signal(false);
  openModal = computed(() => this.modalOpen());
  selected = signal<IProductsModel | null>(null);

  filterValue = signal<string>('');
  private filter$ = new Subject<string>();

  constructor() {
    super();
    this.createData();

    this.filter$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) =>
          value.trim() ? this.service.searchByName(value.trim()) : this.service.search(),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((data) => this.dataModel.set(data));
  }

  override createData(): void {
    this.dataModel.set(toSignal(this.route.data)()?.['data'] ?? []);
    this.configTable = computed(() => ({
      data: this.dataModel(),
      titles: [
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.NAME', dataField: 'name' },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.COIN', dataField: 'nameCoin' },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.MARK', dataField: 'nameBrand' },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.CATEGORY', dataField: 'nameCategory' },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.GROUP', dataField: 'nameGroup' },
        {
          name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.COLOR',
          dataField: 'colorHex',
          transform: {
            type: 'make',
            function: (value: string) => {
              if (!value) return '';
              return `$class,d-inline-block rounded$style,width: 20px; height: 20px; background-color: ${value};$value,${value}`;
            },
          },
        },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.MEASURE', dataField: 'nameMeasure' },
        { name: 'MAIN.FEATURES.PRODUCT_MASTER.FIELDS.PRICESELL', dataField: 'priceSell' },
      ],
      buttons: [
        {
          name: 'COMMONS.EDIT',
          show: () => true,
          action: (item) => this.router.navigate(['products', 'form', item.id]),
          style: 'btn btn-primary',
        },
        {
          name: 'COMMONS.DELE',
          show: () => true,
          action: (item) => {
            this.selected.set(item);
            this.modalOpen.set(true);
          },
          style: 'btn btn-danger',
        },
      ],
    }));
  }

  override reloadData(): void {
    this.service.search().subscribe((data) => this.dataModel.set(data));
  }

  override onNewRegister(): void {
    this.router.navigate(['products', 'form']);
  }

  onFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue.set(value);
    this.filter$.next(value);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  deleteSelected(): void {
    const item = this.selected();
    if (!item?.id) return;
    this.service.delete(item.id).subscribe({
      next: () => {
        this.reloadData();
        this.toast.show(this.t('DELETE.SUCCESS'), 'success');
        this.closeModal();
      },
      error: () => {
        this.toast.show(this.t('DELETE.ERROR'), 'danger');
        this.closeModal();
      },
    });
  }

  private t(key: string): string {
    return this.translate.instant(`MAIN.FEATURES.PRODUCT_MASTER.MESSAGES.${key}`, {
      entity: this.translate.instant('MAIN.FEATURES.PRODUCT_MASTER.ENTITIES.PRODUCT'),
    });
  }
}
