import { Component, Input, ElementRef, Renderer2, ViewEncapsulation, ViewChild, OnChanges, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-preload-image',
  templateUrl: './preload-image.component.html',
  styleUrls: [
    './styles/preload-image.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PreloadImageComponent implements OnChanges {
  _src = '';
  _title = '';
  _alt = '';
  _classes = '';
  _ratio: { w: number, h: number };
  @ViewChild('_img') _imageElement: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {}

  @Input() set alt(val: string) {
    this._alt = (val !== undefined && val !== null) ? val : '';
  }

  @Input() set title(val: string) {
    this._title = (val !== undefined && val !== null) ? val : '';
  }

  @Input() set classes(val: string) {
    this._classes = (val !== undefined && val !== null) ? val : '';
  }

  @Input() set src(val: string) {
    this._src = (val !== undefined && val !== null) ? val : '';
  }

  @Input() set ratio(ratio: { w: number, h: number }) {
    this._ratio = ratio || null;
  }

  ngOnChanges() {
    const ratio_height = (this._ratio.h / this._ratio.w * 100) + '%';
    // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
    this._renderer.setStyle(this._elementRef.nativeElement, 'padding', '0px 0px ' + ratio_height + ' 0px');
    this._update();
  }

  _update() {
    // When using ssr (server Side Rendering), avoid the loading animation while the browser loads the image resource
    if (isPlatformServer(this.platformId)) {
      this._loaded(true);
    } else {
      this._loaded(false);
    }
  }

  _loaded(isLoaded: boolean) {
    if (isLoaded) {
      this._renderer.addClass(this._elementRef.nativeElement, 'img-loaded');
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, 'img-loaded');
    }
  }
}
