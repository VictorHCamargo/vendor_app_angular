import { Component, computed, inject } from '@angular/core';
import { Modal } from '../modal/modal';
import { LoadingComponentsService } from './service/loading-components-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-loading-components',
  imports: [Modal, TranslatePipe],
  templateUrl: './loading-components.html',
  styleUrl: './loading-components.scss',
})
export class LoadingComponents {
  loadingComponentsService = inject(LoadingComponentsService);

  isLoading = computed(() => this.loadingComponentsService.isLoading());
}
