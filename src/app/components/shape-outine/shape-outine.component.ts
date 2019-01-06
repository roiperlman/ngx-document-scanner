import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {LimitsService, PointPositionChange} from '../../services/limits.service';

@Component({
  selector: 'app-shape-outine',
  templateUrl: './shape-outine.component.html',
  styleUrls: ['./shape-outine.component.scss']
})
export class ShapeOutineComponent implements AfterViewInit {

  @Input() color = '#3cabe2';
  @Input() weight: number;
  @ViewChild('outline') canvas;

  private _points: Array<PointPositionChange>;
  private _sortedPoints: Array<PointPositionChange>;
  constructor(private limitisService: LimitsService) {}

  ngAfterViewInit() {
    this.limitisService.positions.subscribe(positions => {
      this._points = positions;
      this.sortPoints();
      this.drawShape();
    });
  }

  sortPoints() {
    const _points = Array.from(this._points);
    const sortedPoints = [];

    const sortOrder = {
      vertical: ['top', 'top', 'bottom', 'bottom'],
      horizontal: ['left', 'right', 'right', 'left']
    }

    for (let i = 0; i < 4; i++) {
      const roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
      sortedPoints.push(_points.filter((point) => {
        return this.limitisService.compareArray(point.roles, roles)
      })[0]);
      console.log(roles);
      console.log(_points.filter((point) => {
        return this.limitisService.compareArray(point.roles, roles)
      })[0].roles);
    }
    this._sortedPoints = sortedPoints;
  }

  drawShape() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = this.weight;
    ctx.strokeStyle = this.color;

    this._sortedPoints.forEach((point, index) => {
      const nextPoint = this._sortedPoints[index + 1];
      ctx.beginPath();
      ctx.moveTo(point.x + 2, point.y + 2);
      if (index === this._sortedPoints.length - 1) {
        ctx.lineTo(this._sortedPoints[0].x + 2, this._points[0].y + 2);
      } else {
        ctx.lineTo(nextPoint.x + 2, nextPoint.y + 2);
      }
      ctx.stroke();
    });
  }
}


