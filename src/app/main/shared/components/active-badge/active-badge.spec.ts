import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ActiveBadge } from './active-badge';

describe('ActiveBadge', () => {
  it('exibe o estilo ativo quando recebe true', () => {
    TestBed.configureTestingModule({ imports: [ActiveBadge] });
    const fixture: ComponentFixture<ActiveBadge> = TestBed.createComponent(ActiveBadge);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.badge').classList).toContain('bg-success');
  });

  it('exibe o estilo inativo quando recebe false', () => {
    TestBed.configureTestingModule({ imports: [ActiveBadge] });
    const fixture: ComponentFixture<ActiveBadge> = TestBed.createComponent(ActiveBadge);
    fixture.componentRef.setInput('active', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.badge').classList).toContain('bg-secondary');
  });
});
