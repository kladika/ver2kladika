import { Component, Input, ViewEncapsulation, OnChanges } from '@angular/core';

@Component({
  selector: 'app-percentage-bar-rating',
  templateUrl: './percentage-bar-rating.component.html',
  styleUrls: [
    './styles/percentage-bar-rating.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PercentageBarRatingComponent implements OnChanges {
  _min = 0;
  _max = 100;
  _tickInterval = 20;
  _marks: Array<any>;

  @Input() set min(val: number) {
    this._min = (val !== undefined && val !== null) ? val : 0;
  }

  @Input() set max(val: number) {
    this._max = (val !== undefined && val !== null) ? val : 100;
  }

  @Input() set tickInterval(val: number) {
    this._tickInterval = (val !== undefined && val !== null) ? val : 20;
  }

  @Input() rating;

  @Input() labels;

  ngOnChanges() {
    this._marks = new Array(this._max / this._tickInterval);
  }
}
