import {AfterViewInit, Component, Input} from '@angular/core';
import {LimitsService, PointPositionChange, PositionChangeData} from '../../services/limits.service';
import {ImageDimensions} from '../../PublicModels';
import {LimitException, XYPosition} from '../../PrivateModels';

@Component({
  selector: 'ngx-draggable-point',
  templateUrl: './ngx-draggable-point.component.html',
})
export class NgxDraggablePointComponent implements AfterViewInit {
  @Input() width = 10;
  @Input() height = 10;
  @Input() color = '#3cabe2';
  @Input() shape: 'rect' | 'circle' = 'rect';
  @Input() pointOptions: 'rect' | 'circle' = 'rect';
  @Input() limitRoles: Array<'left'|'right'|'top'|'bottom'>;
  @Input() startPosition: XYPosition;
  @Input() container: HTMLElement;
  @Input() private _currentPosition: XYPosition;
  position: XYPosition = {
    x: 0,
    y: 0
  };
  private _paneDimensions: ImageDimensions;
  resetPosition: XYPosition;

  constructor(private limitsService: LimitsService) {}

  ngAfterViewInit() {
    Object.keys(this.pointOptions).forEach(key => {
      this[key] = this.pointOptions[key];
    });
    // subscribe to pane dimensions changes
    this.limitsService.paneDimensions.subscribe(dimensions => {
      if (dimensions.width > 0 && dimensions.width > 0) {
        this._paneDimensions = {
          width: dimensions.width,
          height: dimensions.height
        };
        this.position = this.getInitialPosition(dimensions);
        this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
      }
    });
    // subscribe to external reposition events
    this.limitsService.repositionEvent.subscribe(positions => {
      if (positions.length > 0) {
        this.externalReposition(positions);
      }
    });
  }

  /**
   * returns a css style object for the point
   */
  pointStyle() {
    return {
      width: this.width + 'px',
      height: this.height + 'px',
      'background-color': this.color,
      'border-radius': this.shape === 'circle' ? '100%' : 0,
      position: 'absolute'
    };
  }

  /**
   * registers a position change on the limits service, and adjusts position if necessary
   * @param position - the current position of the point
   */
  positionChange(position: XYPosition) {
    const positionChangeData = new PositionChangeData(position, this.limitRoles);
    const limitException = this.limitsService.exceedsLimit(positionChangeData);
    if (limitException.exceeds) {
      // if exceeds limits, reposition
      this.resetPosition = limitException.resetCoordinates;
    } else {
      this.limitsService.positionChange(positionChangeData);
      this._currentPosition = position;
    }
  }

  /**
   * adjusts the position of the point after a limit exception
   */
  private adjustPosition(limitException: LimitException) {
    const newPosition = {
      x: 0,
      y: 0
    };
    Object.keys(this.startPosition).forEach(axis => {
      newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
    });
    this.position = newPosition;
    this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
  }

  /**
   * called on movement end, checks if last position exceeded the limits ad adjusts
   */
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

  /**
   * calculates the initial positions of the point by it's roles
   * @param dimensions - dimensions of the pane in which the point is located
   */
  private getInitialPosition(dimensions: ImageDimensions) {
    return {
      x: this.limitRoles.includes('left') ? 0 : dimensions.width - this.width / 2,
      y: this.limitRoles.includes('top') ? 0 : dimensions.height - this.height / 2
    };
  }

  /**
   * repositions the point after an external reposition event
   * @param positions - an array of all points on the pane
   */
  private externalReposition(positions: Array<PointPositionChange>) {
    positions.forEach(position => {
      if (this.limitsService.compareArray(this.limitRoles, position.roles)) {
        position = this.enforcePaneLimits(position);
        this.position = {
          x: position.x,
          y: position.y
        };
      }
    });
  }

  /**
   * returns a new point position if the movement exceeded the pane limit
   */
  private enforcePaneLimits(position: PointPositionChange): PointPositionChange {
    if (this._paneDimensions.width === 0 || this._paneDimensions.height === 0) {
      return position;
    } else {
      if (position.x > this._paneDimensions.width) { position.x = this._paneDimensions.width; }
      if (position.x < 0) { position.x = 1; }
      if (position.y > this._paneDimensions.height) { position.y = this._paneDimensions.height; }
      if (position.y < 0) { position.y = 1; }
    }
    return position;
  }
}

