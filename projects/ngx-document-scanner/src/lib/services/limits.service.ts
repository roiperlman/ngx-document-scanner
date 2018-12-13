import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ImageDimensions} from '../PublicModels';
import {LimitException, XYPosition} from '../PrivateModels';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {


  private limitDirections: RolesArray = ['left', 'right', 'top', 'bottom'];
  /**
   * stores the crop limits limits
   */
  private _limits = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  };
  /**
   * stores the array of the draggable points displayed on the crop area
   */
  private _points: Array<PointPositionChange> = [];
  /**
   * stores the pane dimensions
   */
  private _paneDimensions: ImageDimensions;

  // *********** //
  // Observables //
  // *********** //
  public positions: BehaviorSubject<Array<PointPositionChange>> = new BehaviorSubject<Array<PointPositionChange>>(Array.from(this._points));
  public repositionEvent: BehaviorSubject<Array<PointPositionChange>> = new BehaviorSubject<Array<PointPositionChange>>([]);
  public limits: BehaviorSubject<AreaLimits> = new BehaviorSubject<AreaLimits>(this._limits);
  public paneDimensions: BehaviorSubject<ImageDimensions> = new BehaviorSubject({width: 0, height: 0});

  constructor() {
  }

  /**
   * set privew pane dimensions
   */
  public setPaneDimensions(dimensions: ImageDimensions) {
    return new Promise((resolve, reject) => {
      this._paneDimensions = dimensions;
      this.paneDimensions.next(dimensions);
      resolve();
    });
  }

  /**
   * repositions points externally
   */
  public repositionPoints(positions) {
    this._points = positions;
    positions.forEach(position => {
      this.positionChange(position);
    });
    this.repositionEvent.next(positions);
  }

  /**
   * updates limits and point positions and calls next on the observables
   * @param positionChangeData - position change event data
   */
  public positionChange(positionChangeData: PointPositionChange) {
    // update positions according to current position change
    this.updatePosition(positionChangeData);

    // for each direction:
    // 1. filter the _points that have a role as the direction's limit
    // 2. for top and left find max x | y values, and min for right and bottom
    this.limitDirections.forEach(direction => {
      const relevantPoints = this._points.filter(point => {
        return point.roles.includes(direction);
      })
        .map((point: PointPositionChange) => {
          return point[this.getDirectionAxis(direction)];
        });
      let limit;
      if (direction === 'top' || direction === 'left') {
        limit = Math.max(...relevantPoints);
      }
      if (direction === 'right' || direction === 'bottom') {
        limit = Math.min(...relevantPoints);
      }
      this._limits[direction] = limit;
    });

    this.limits.next(this._limits);
    this.positions.next(Array.from(this._points));
  }

  /**
   * updates the position of the point
   * @param positionChange - position change event data
   */
  public updatePosition(positionChange: PointPositionChange) {
    // finds the current position of the point by it's roles, than splices it for the new position or pushes it if it's not yet in the array
    const index = this._points.findIndex(point => {
      return this.compareArray(positionChange.roles, point.roles);
    });
    if (index === -1) {
      this._points.push(positionChange);
    } else {
      this._points.splice(index, 1, positionChange);
    }
  }

  /**
   * check if a position change event exceeds the limits
   * @param positionChange - position change event data
   * @returns LimitException0
   */
  public exceedsLimit(positionChange: PointPositionChange): LimitException {
    const pointLimits = this.limitDirections.filter(direction => {
      return !positionChange.roles.includes(direction);
    });

    const limitException: LimitException = {
      exceeds: false,
      resetCoefficients: {
        x: 0,
        y: 0
      },
      resetCoordinates: {
        x: positionChange.x,
        y: positionChange.y
      }
    };

    // limit directions are the opposite sides of the point's roles
    pointLimits.forEach(direction => {
      const directionAxis = this.getDirectionAxis(direction);
      if (direction === 'top' || direction === 'left') {
        if (positionChange[directionAxis] < this._limits[direction]) {
          limitException.resetCoefficients[directionAxis] = 1;
          limitException.resetCoordinates[directionAxis] = this._limits[direction];
        }
      } else if (direction === 'right' || direction === 'bottom') {
        if (positionChange[directionAxis] > this._limits[direction]) {
          limitException.resetCoefficients[directionAxis] = -1;
          limitException.resetCoordinates[directionAxis] = this._limits[direction];
        }
      }
    });

    if (limitException.resetCoefficients.x !== 0 || limitException.resetCoefficients.y !== 0) {
      limitException.exceeds = true;
    }

    return limitException;
  }

  /**
   * rotate crop tool points clockwise
   * @param resizeRatios - ratio between the new dimensions and the previous
   * @param initialPreviewDimensions - preview pane dimensions before rotation
   * @param initialPositions - current positions before rotation
   */
  public rotateClockwise(resizeRatios, initialPreviewDimensions, initialPositions: Array<PointPositionChange>) {
    // convert positions to ratio between position to initial pane dimension
    initialPositions = initialPositions.map(point => {
      return new PositionChangeData({
        x: point.x / initialPreviewDimensions.width,
        y: point.y / initialPreviewDimensions.height,
      }, point.roles);
    });
    this.repositionPoints(initialPositions.map(point => {
      return this.rotateCornerClockwise(point);
    }));
  }

  /**
   * returns the corner positions after a 90 degrees clockwise rotation
   */
  private rotateCornerClockwise(corner: PointPositionChange): PointPositionChange {
    const rotated: PointPositionChange = {
      x: this._paneDimensions.width * (1 - corner.y),
      y: this._paneDimensions.height * corner.x,
      roles: []
    };
    // rotates corner according to order
    const order: Array<RolesArray> = [
      ['bottom', 'left'],
      ['top', 'left'],
      ['top', 'right'],
      ['bottom', 'right'],
      ['bottom', 'left']
    ];
    rotated.roles = order[order.findIndex(roles => {
      return this.compareArray(roles, corner.roles);
    }) + 1];
    return rotated;
  }

  /**
   * checks if two array contain the same values
   * @param array1 - array 1
   * @param array2 - array 2
   * @returns boolean
   */
  public compareArray(array1: Array<string>, array2: Array<string>): boolean {
    return array1.every((element) => {
      return array2.includes(element);
    }) && array1.length === array2.length;
  }

  private getDirectionAxis(direction) {
    return {
      left: 'x',
      right: 'x',
      top: 'y',
      bottom: 'y'
    }[direction];
  }
}


export interface PointPositionChange {
  x: number;
  y: number;
  roles: RolesArray;
}

export interface AreaLimits {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

export type RolesArray = Array<Direction>;

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

export type Direction = 'left' | 'right' | 'top' | 'bottom';
