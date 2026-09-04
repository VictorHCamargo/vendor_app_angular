import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ProductDeleteModal } from './product-delete-modal';

describe('ProductDeleteModal', () => {
  const createComponent = () => {
    TestBed.configureTestingModule({ imports: [ProductDeleteModal] });
    const fixture: ComponentFixture<ProductDeleteModal> =
      TestBed.createComponent(ProductDeleteModal);
    fixture.componentRef.setInput('name', 'Produto A');
    fixture.componentRef.setInput('entityKey', 'MAIN.FEATURES.PRODUCT_MASTER.ENTITY');
    fixture.detectChanges();
    return fixture;
  };

  it('emite o cancelamento ao fechar', () => {
    const fixture = createComponent();
    const closed = vi.fn();
    fixture.componentInstance.closed.subscribe(closed);

    fixture.nativeElement.querySelector('.btn-close').click();

    expect(closed).toHaveBeenCalledOnce();
  });

  it('emite a confirmação ao excluir', () => {
    const fixture = createComponent();
    const confirmed = vi.fn();
    fixture.componentInstance.confirmed.subscribe(confirmed);

    fixture.nativeElement.querySelector('.btn-danger').click();

    expect(confirmed).toHaveBeenCalledOnce();
  });
});
