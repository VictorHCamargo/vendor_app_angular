import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-delete-modal',
  imports: [TranslatePipe],
  templateUrl: './product-delete-modal.html',
  styleUrl: './product-delete-modal.scss',
})
export class ProductDeleteModal {
  name = input.required<string>();
  entityKey = input.required<string>();
  closed = output<void>();
  confirmed = output<void>();
}
