import { Component, inject, WritableSignal, signal, computed, Signal } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICategoryModel } from '../interfaces/category-model';
import { BaseList } from '../../../../shared/class/base-list';
import { Table } from '../../../../shared/components/table/table';
import { ToastService } from '../../../../shared/components/toast-messages/services/toast-service';
//TO-DO: Meus products Grupo e Marca
@Component({
  selector: 'app-category-list',
  imports: [Table],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList extends BaseList<ICategoryModel> {
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  toastService = inject(ToastService);
  constructor() {
    super()
    this.createData();
  }
  
  override createData() {
    const routeData = toSignal(this.route.data);
    this.dataModel.set(routeData()?.['data']);
    this.configTable = computed(() => {
      return {
        data : this.dataModel(),
        buttons : [
          {
            name : "Excluir",
            show : () => {
              return true
            },
            action : (data) => {
              this.categoryService.delete(data.id!).subscribe({
                next: (_) => {
                  this.reloadData();
                  this.toastService.show("Categoria deletada com sucesso","success",2000);
                },
                error: (_) => {
                  this.toastService.show("Não é permitido deletar categorias vinculadas a empresas","danger",2000);
                }
              });
            },
            style : 'btn btn-danger'
          },
          {
            name : "Editar",
            show : () => {
              return true
            },
            action : (data) => {
              this.router.navigate(['category','form',`${data.id}`]);
            },
            style : 'btn btn-primary'
          }
        ],
        titles : [
          {
            name : "Categoria de Produtos",
            dataField : "name"
          }
        ]
      }
    }) 
  }
  
  
  override reloadData() {
    this.categoryService.search().subscribe((result) => {
      this.dataModel.set(result as ICategoryModel[]);
    })
  }

  
  
  override onNewRegister() {
    this.toastService.show("Indo para o cadastro das Categorias",'info');
    this.router.navigate(['category','form'])
  }
}
