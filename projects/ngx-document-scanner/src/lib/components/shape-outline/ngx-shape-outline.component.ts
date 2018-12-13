import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {LimitsService, PointPositionChange} from '../../services/limits.service';
import {ImageDimensions} from '../../PublicModels';

@Component({
  selector: 'ngx-shape-outine',
  templateUrl: './ngx-shape-outline.component.html',
})
export class NgxShapeOutlineComponent implements AfterViewInit {

  @Input() color = '#3cabe2';
  @Input() weight: number;
  @Input() dimensions: ImageDimensions;
  @ViewChild('outline') canvas;

  private _points: Array<PointPositionChange>;
  private _sortedPoints: Array<PointPositionChange>;
  constructor(private limitsService: LimitsService) {}

  ngAfterViewInit() {
    // init drawing canvas dimensions
    this.canvas.nativeElement.width = this.dimensions.width;
    this.canvas.nativeElement.height = this.dimensions.height;
    this.limitsService.positions.subscribe(positions => {
      if (positions.length === 4) {
        this._points = positions;
        this.sortPoints();
        this.clearCanvas();
        this.drawShape();
      }
    });
    // subscribe to changes in the pane's dimensions
    this.limitsService.paneDimensions.subscribe(dimensions => {
      this.clearCanvas();
      this.canvas.nativeElement.width = dimensions.width;
      this.canvas.nativeElement.height = dimensions.height;
    });
    // subscribe to reposition events
    this.limitsService.repositionEvent.subscribe( positions => {
      if (positions.length === 4) {
        setTimeout( () => {
          this.clearCanvas();
          this.sortPoints();
          this.drawShape();
        }, 10);
      }
    });
  }

  /**
   * clears the shape canvas
   */
  private clearCanvas() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  /**
   * sorts the array of points according to their clockwise alignment
   */
  private sortPoints() {
    const _points = Array.from(this._points);
    const sortedPoints = [];

    const sortOrder = {
      vertical: ['top', 'top', 'bottom', 'bottom'],
      horizontal: ['left', 'right', 'right', 'left']
    };

    for (let i = 0; i < 4; i++) {
      const roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
      sortedPoints.push(_points.filter((point) => {
        return this.limitsService.compareArray(point.roles, roles);
      })[0]);

    }
    this._sortedPoints = sortedPoints;
  }

  /**
   * draws a line between the points according to their order
   */
  private drawShape() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = this.weight;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    this._sortedPoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      }
      if (index !== this._sortedPoints.length - 1) {
        const nextPoint = this._sortedPoints[index + 1];
        ctx.lineTo(nextPoint.x, nextPoint.y);
      } else {
        ctx.closePath();
      }
    });
    ctx.stroke();
  }
}


