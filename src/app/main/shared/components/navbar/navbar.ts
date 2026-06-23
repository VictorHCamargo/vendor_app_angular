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
  translateService = inject(TranslateService);
  components = input<INavbarConfig[]>([]);
  languages = input<ILanguagesConfig[]>([]);

  hasExternalRedirect(url: string): boolean {
    url.includes('');
    return false;
  }

  changeLanguenges(acronym : TAcronyms) {
    this.translateService.use(acronym);
  }
}
