import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ColorSwatch } from './color-swatch';

describe('ColorSwatch', () => {
  it('exibe a cor recebida', () => {
    TestBed.configureTestingModule({ imports: [ColorSwatch] });
    const fixture: ComponentFixture<ColorSwatch> = TestBed.createComponent(ColorSwatch);
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.swatch').style.backgroundColor).toBe(
      'rgb(255, 0, 0)',
    );
    expect(fixture.nativeElement.textContent).toContain('#ff0000');
  });
});
