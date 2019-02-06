import { Component, ViewEncapsulation, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: [
    './styles/star-rating.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: StarRatingComponent,
    multi: true
  }]
})
export class StarRatingComponent implements ControlValueAccessor, OnInit {

  @Input() max = 5;
  @Input() readOnly = false;

  range: Array<number>;
  innerValue: any;
  propagateChange: any = noop;

  ngOnInit() {
    const states: Array<number> = [];

    for (let i = 0; i < this.max; i++) {
      if (this.innerValue > i && this.innerValue < i + 1) {
        states[i] = 2;
      } else if (this.innerValue > i) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }

    this.range = states;
  }

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.propagateChange(val);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  rate(amount: number) {
    if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
      this.value = amount;
    }
  }
}
