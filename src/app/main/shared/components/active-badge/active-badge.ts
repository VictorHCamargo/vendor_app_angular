import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-active-badge',
  imports: [TranslatePipe],
  templateUrl: './active-badge.html',
  styleUrl: './active-badge.scss',
})
export class ActiveBadge {
  active = input.required<boolean>();
}
