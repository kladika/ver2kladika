import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorRadioBtn]'
})
export class ColorRadioButtonDirective implements OnInit {
  @Input() appColorRadioBtn: string;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  setColor(color: string) {
    this._renderer.setStyle(this._elementRef.nativeElement, 'backgroundColor', color);
    this._renderer.setStyle(this._elementRef.nativeElement, 'borderColor', color);
  }

  ngOnInit() {
    this.setColor(this.appColorRadioBtn);
  }
}
