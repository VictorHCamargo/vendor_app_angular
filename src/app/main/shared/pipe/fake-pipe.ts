import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'fake',
})
export class FakePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const [_,classes,styles,values] = value.split('$');

    const [_class,classValue] = classes.split(',');

    const [_style,styleValue] = styles.split(',');

    const [_value,valueValue] = values.split(',');

    const html = `<span class="${classValue}" style="${styleValue}"></span>${valueValue}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
