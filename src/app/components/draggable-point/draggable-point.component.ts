import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AreaLimits, LimitException, LimitsService, PointPositionChange} from '../../services/limits.service';

@Component({
  selector: 'app-draggable-point',
  templateUrl: './draggable-point.component.html',
  styleUrls: ['./draggable-point.component.scss']
})
export class DraggablePointComponent implements AfterViewInit {
  @Input() width = 10;
  @Input() height = 10;
  @Input() color = '#3cabe2';
  @Input() shape: 'rect' | 'circle' = 'rect';
  @Input() limitRoles: Array<'left'|'right'|'top'|'bottom'>;
  @Input() startPosition: XYPosition;
  @Input() container: HTMLElement;
  @Input()
  set rotation(direction) {
    const rotated = this.limitsService.rotateClockwise(new PositionChangeData(this._currentPosition, this.limitRoles));
    this.limitRoles = rotated.roles;
    this.position.x = rotated.x;
    this.position.y = rotated.y;
  }
  position: XYPosition = {
    x: 0,
    y: 0
  };
  private _currentPosition: XYPosition;
  resetPosition: XYPosition;

  constructor(private limitsService: LimitsService) {
  }

  ngAfterViewInit() {
    this.position = this.startPosition;
    // Object.assign(this.position, this.startPosition);
    this.limitsService.positionChange(new PositionChangeData(this.startPosition, this.limitRoles));
  }

  pointStyle() {
    return {
      width: this.width + 'px',
      height: this.height + 'px',
      'background-color': this.color,
      'border-radius': this.shape === 'circle' ? '100%' : 0,
      position: 'absolute'
    };
  }

  positionChange(position: XYPosition) {
    const positionChangeData = new PositionChangeData(position, this.limitRoles);
    const limitException = this.limitsService.exceedsLimit(positionChangeData);
    if (limitException.exceeds) {
      this.resetPosition = limitException.resetCoordinates;
      // this.adjustPosition(limitException, position);
    } else {
      this.limitsService.positionChange(positionChangeData);
      this._currentPosition = position;
    }
  }

  adjustPosition(limitException: LimitException) {
    const newPosition = {
      x: 0,
      y: 0
    };
    Object.keys(this.startPosition).forEach(axis => {

      newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis] * this.width;
    });
    this.position = newPosition;
    this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
    console.log(this.position);
  }

  movementEnd(position: XYPosition) {
    let positionChangeData = new PositionChangeData(position, this.limitRoles);
    const limitException = this.limitsService.exceedsLimit(positionChangeData);
    if (limitException.exceeds) {
      this.resetPosition = limitException.resetCoordinates;
      if (limitException.exceeds) {
        this.adjustPosition(limitException);
        positionChangeData = new PositionChangeData(this.position, this.limitRoles);
        this.limitsService.updatePosition(positionChangeData);
      }
    }
  }

  test() {
    console.log(this);
  }
}


export interface DraggablePointConfig {
  width?: number;
  height?: number;
  color?: string;
  shape?: 'rect' | 'circle';
  limitRoles?: RolesArray;
  startPosition?: XYPosition;
}

export interface XYPosition {
  x: number;
  y: number;
}

export class PositionChangeData implements PointPositionChange {
  x: number;
  y: number;
  roles: RolesArray;

  constructor(position: XYPosition, roles: RolesArray) {
    this.x = position.x;
    this.y = position.y;
    this.roles = roles;
  }
}

export type Direction = 'left'|'right'|'top'|'bottom';
export type RolesArray = Array<Direction>;
