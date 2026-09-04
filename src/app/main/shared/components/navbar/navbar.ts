import { Component, inject, input } from '@angular/core';
import { INavbarConfig } from './interfaces/navbar-config';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ILanguagesConfig, TAcronyms } from './interfaces/languages-config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly translateService = inject(TranslateService);

  readonly components = input<INavbarConfig[]>([]);
  readonly languages = input<ILanguagesConfig[]>([]);

  changeLanguage(acronym: TAcronyms): void {
    this.translateService.use(acronym);
  }
}
