import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';
import { ICategoryModel } from '../../../features/products/category/interfaces/category-model';

describe('Table', () => {
  let component: Table<ICategoryModel>;
  let fixture: ComponentFixture<Table<ICategoryModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Table<ICategoryModel>);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
