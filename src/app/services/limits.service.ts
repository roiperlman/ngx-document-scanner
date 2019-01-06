import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Direction, RolesArray} from '../components/draggable-point/draggable-point.component';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  private _limits = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  };
  private _points: any[] = [];

  private limitDirections: RolesArray = ['left', 'right', 'top', 'bottom'];

  public positions: BehaviorSubject<Array<PointPositionChange>> = new BehaviorSubject<Array<PointPositionChange>>(Array.from(this._points));
  public limits: BehaviorSubject<AreaLimits> = new BehaviorSubject<AreaLimits>(this._limits);

  constructor() {

  }

  private getDirectionAxis(direction) {
    return {
      left: 'x',
      right: 'x',
      top: 'y',
      bottom: 'y'
    }[direction];
  }

  /**
   * updates limits and point positions and calls next on the observables
   * @param positionChangeData - position change event data
   */
  positionChange(positionChangeData: PointPositionChange) {
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
  updatePosition(positionChange: PointPositionChange) {
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
   * @returns LimitException
   */
  exceedsLimit(positionChange: PointPositionChange): LimitException {
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
   * checks if two array contain the same values
   * @param array1 - array 1
   * @param array2 - array 2
   * @returns boolean
   */
  compareArray(array1: Array<string>, array2: Array<string>): boolean {
    return array1.every((element) => {
      return array2.includes(element);
    }) && array1.length === array2.length;
  }

  rotateClockwise(corner: PointPositionChange): PointPositionChange {
    const rotated: PointPositionChange = {
      x: corner.y,
      y: corner.x,
      roles: []
    };
    corner.roles.forEach(direction => {
      rotated.roles.push(this.nextSquareSide(direction));
    });
    return rotated;
  }

  private nextSquareSide(currentDirection): Direction {
    const order: RolesArray = ['left', 'top', 'right', 'bottom'];
    const index = order.findIndex(item => {
      return item === currentDirection;
    });
    if (index === -1) {
      throw Error('invalid direction');
    } else if (index === order.length - 1)  {
      return order[0];
    } else {
      return order[index + 1];
    }
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

export interface LimitException {
  exceeds: boolean;
  resetCoefficients: {
    x: 1 | 0 | -1
    y: 1 | 0 | -1
  };
  resetCoordinates: {
    x: number;
    y: number;
  };
}

