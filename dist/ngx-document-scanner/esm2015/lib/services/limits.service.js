/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class LimitsService {
    constructor() {
        this.limitDirections = ['left', 'right', 'top', 'bottom'];
        /**
         * stores the crop limits limits
         */
        this._limits = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };
        /**
         * stores the array of the draggable points displayed on the crop area
         */
        this._points = [];
        // *********** //
        // Observables //
        // *********** //
        this.positions = new BehaviorSubject(Array.from(this._points));
        this.repositionEvent = new BehaviorSubject([]);
        this.limits = new BehaviorSubject(this._limits);
        this.paneDimensions = new BehaviorSubject({ width: 0, height: 0 });
    }
    /**
     * set privew pane dimensions
     * @param {?} dimensions
     * @return {?}
     */
    setPaneDimensions(dimensions) {
        return new Promise((resolve, reject) => {
            this._paneDimensions = dimensions;
            this.paneDimensions.next(dimensions);
            resolve();
        });
    }
    /**
     * repositions points externally
     * @param {?} positions
     * @return {?}
     */
    repositionPoints(positions) {
        this._points = positions;
        positions.forEach(position => {
            this.positionChange(position);
        });
        this.repositionEvent.next(positions);
    }
    /**
     * updates limits and point positions and calls next on the observables
     * @param {?} positionChangeData - position change event data
     * @return {?}
     */
    positionChange(positionChangeData) {
        // update positions according to current position change
        this.updatePosition(positionChangeData);
        // for each direction:
        // 1. filter the _points that have a role as the direction's limit
        // 2. for top and left find max x | y values, and min for right and bottom
        this.limitDirections.forEach(direction => {
            /** @type {?} */
            const relevantPoints = this._points.filter(point => {
                return point.roles.includes(direction);
            })
                .map((point) => {
                return point[this.getDirectionAxis(direction)];
            });
            /** @type {?} */
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
     * @param {?} positionChange - position change event data
     * @return {?}
     */
    updatePosition(positionChange) {
        // finds the current position of the point by it's roles, than splices it for the new position or pushes it if it's not yet in the array
        /** @type {?} */
        const index = this._points.findIndex(point => {
            return this.compareArray(positionChange.roles, point.roles);
        });
        if (index === -1) {
            this._points.push(positionChange);
        }
        else {
            this._points.splice(index, 1, positionChange);
        }
    }
    /**
     * check if a position change event exceeds the limits
     * @param {?} positionChange - position change event data
     * @return {?} LimitException0
     */
    exceedsLimit(positionChange) {
        /** @type {?} */
        const pointLimits = this.limitDirections.filter(direction => {
            return !positionChange.roles.includes(direction);
        });
        /** @type {?} */
        const limitException = {
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
            /** @type {?} */
            const directionAxis = this.getDirectionAxis(direction);
            if (direction === 'top' || direction === 'left') {
                if (positionChange[directionAxis] < this._limits[direction]) {
                    limitException.resetCoefficients[directionAxis] = 1;
                    limitException.resetCoordinates[directionAxis] = this._limits[direction];
                }
            }
            else if (direction === 'right' || direction === 'bottom') {
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
     * @param {?} resizeRatios - ratio between the new dimensions and the previous
     * @param {?} initialPreviewDimensions - preview pane dimensions before rotation
     * @param {?} initialPositions - current positions before rotation
     * @return {?}
     */
    rotateClockwise(resizeRatios, initialPreviewDimensions, initialPositions) {
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
     * @private
     * @param {?} corner
     * @return {?}
     */
    rotateCornerClockwise(corner) {
        /** @type {?} */
        const rotated = {
            x: this._paneDimensions.width * (1 - corner.y),
            y: this._paneDimensions.height * corner.x,
            roles: []
        };
        // rotates corner according to order
        /** @type {?} */
        const order = [
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
     * @param {?} array1 - array 1
     * @param {?} array2 - array 2
     * @return {?} boolean
     */
    compareArray(array1, array2) {
        return array1.every((element) => {
            return array2.includes(element);
        }) && array1.length === array2.length;
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    getDirectionAxis(direction) {
        return {
            left: 'x',
            right: 'x',
            top: 'y',
            bottom: 'y'
        }[direction];
    }
}
LimitsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LimitsService.ctorParameters = () => [];
/** @nocollapse */ LimitsService.ngInjectableDef = i0.defineInjectable({ factory: function LimitsService_Factory() { return new LimitsService(); }, token: LimitsService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LimitsService.prototype.limitDirections;
    /**
     * stores the crop limits limits
     * @type {?}
     * @private
     */
    LimitsService.prototype._limits;
    /**
     * stores the array of the draggable points displayed on the crop area
     * @type {?}
     * @private
     */
    LimitsService.prototype._points;
    /**
     * stores the pane dimensions
     * @type {?}
     * @private
     */
    LimitsService.prototype._paneDimensions;
    /** @type {?} */
    LimitsService.prototype.positions;
    /** @type {?} */
    LimitsService.prototype.repositionEvent;
    /** @type {?} */
    LimitsService.prototype.limits;
    /** @type {?} */
    LimitsService.prototype.paneDimensions;
}
/**
 * @record
 */
export function PointPositionChange() { }
if (false) {
    /** @type {?} */
    PointPositionChange.prototype.x;
    /** @type {?} */
    PointPositionChange.prototype.y;
    /** @type {?} */
    PointPositionChange.prototype.roles;
}
/**
 * @record
 */
export function AreaLimits() { }
if (false) {
    /** @type {?} */
    AreaLimits.prototype.top;
    /** @type {?} */
    AreaLimits.prototype.bottom;
    /** @type {?} */
    AreaLimits.prototype.right;
    /** @type {?} */
    AreaLimits.prototype.left;
}
export class PositionChangeData {
    /**
     * @param {?} position
     * @param {?} roles
     */
    constructor(position, roles) {
        this.x = position.x;
        this.y = position.y;
        this.roles = roles;
    }
}
if (false) {
    /** @type {?} */
    PositionChangeData.prototype.x;
    /** @type {?} */
    PositionChangeData.prototype.y;
    /** @type {?} */
    PositionChangeData.prototype.roles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQU9yQyxNQUFNLE9BQU8sYUFBYTtJQThCeEI7UUEzQlEsb0JBQWUsR0FBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7O1FBSWpFLFlBQU8sR0FBRztZQUNoQixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7Ozs7UUFJTSxZQUFPLEdBQStCLEVBQUUsQ0FBQzs7OztRQVMxQyxjQUFTLEdBQWdELElBQUksZUFBZSxDQUE2QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25JLG9CQUFlLEdBQWdELElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUNuSCxXQUFNLEdBQWdDLElBQUksZUFBZSxDQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRixtQkFBYyxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFHckcsQ0FBQzs7Ozs7O0lBS00saUJBQWlCLENBQUMsVUFBMkI7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FB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WUFBWSxRQUFvQixFQUFFLEtBQWlCO1FBQ2pELElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGOzs7SUFUQywrQkFBVTs7SUFDViwrQkFBVTs7SUFDVixtQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi9QdWJsaWNNb2RlbHMnO1xyXG5pbXBvcnQge0xpbWl0RXhjZXB0aW9uLCBYWVBvc2l0aW9ufSBmcm9tICcuLi9Qcml2YXRlTW9kZWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpbWl0c1NlcnZpY2Uge1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBsaW1pdERpcmVjdGlvbnM6IFJvbGVzQXJyYXkgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddO1xyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgY3JvcCBsaW1pdHMgbGltaXRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbGltaXRzID0ge1xyXG4gICAgdG9wOiAwLFxyXG4gICAgYm90dG9tOiAwLFxyXG4gICAgcmlnaHQ6IDAsXHJcbiAgICBsZWZ0OiAwXHJcbiAgfTtcclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIGFycmF5IG9mIHRoZSBkcmFnZ2FibGUgcG9pbnRzIGRpc3BsYXllZCBvbiB0aGUgY3JvcCBhcmVhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9pbnRzOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPiA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgcGFuZSBkaW1lbnNpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcGFuZURpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcclxuXHJcbiAgLy8gKioqKioqKioqKiogLy9cclxuICAvLyBPYnNlcnZhYmxlcyAvL1xyXG4gIC8vICoqKioqKioqKioqIC8vXHJcbiAgcHVibGljIHBvc2l0aW9uczogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+KEFycmF5LmZyb20odGhpcy5fcG9pbnRzKSk7XHJcbiAgcHVibGljIHJlcG9zaXRpb25FdmVudDogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+KFtdKTtcclxuICBwdWJsaWMgbGltaXRzOiBCZWhhdmlvclN1YmplY3Q8QXJlYUxpbWl0cz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFyZWFMaW1pdHM+KHRoaXMuX2xpbWl0cyk7XHJcbiAgcHVibGljIHBhbmVEaW1lbnNpb25zOiBCZWhhdmlvclN1YmplY3Q8SW1hZ2VEaW1lbnNpb25zPiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgcHJpdmV3IHBhbmUgZGltZW5zaW9uc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRQYW5lRGltZW5zaW9ucyhkaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuX3BhbmVEaW1lbnNpb25zID0gZGltZW5zaW9ucztcclxuICAgICAgdGhpcy5wYW5lRGltZW5zaW9ucy5uZXh0KGRpbWVuc2lvbnMpO1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlcG9zaXRpb25zIHBvaW50cyBleHRlcm5hbGx5XHJcbiAgICovXHJcbiAgcHVibGljIHJlcG9zaXRpb25Qb2ludHMocG9zaXRpb25zKSB7XHJcbiAgICB0aGlzLl9wb2ludHMgPSBwb3NpdGlvbnM7XHJcbiAgICBwb3NpdGlvbnMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XHJcbiAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2UocG9zaXRpb24pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlcG9zaXRpb25FdmVudC5uZXh0KHBvc2l0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGVzIGxpbWl0cyBhbmQgcG9pbnQgcG9zaXRpb25zIGFuZCBjYWxscyBuZXh0IG9uIHRoZSBvYnNlcnZhYmxlc1xyXG4gICAqIEBwYXJhbSBwb3NpdGlvbkNoYW5nZURhdGEgLSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZGF0YVxyXG4gICAqL1xyXG4gIHB1YmxpYyBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbkNoYW5nZURhdGE6IFBvaW50UG9zaXRpb25DaGFuZ2UpIHtcclxuICAgIC8vIHVwZGF0ZSBwb3NpdGlvbnMgYWNjb3JkaW5nIHRvIGN1cnJlbnQgcG9zaXRpb24gY2hhbmdlXHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlRGF0YSk7XHJcblxyXG4gICAgLy8gZm9yIGVhY2ggZGlyZWN0aW9uOlxyXG4gICAgLy8gMS4gZmlsdGVyIHRoZSBfcG9pbnRzIHRoYXQgaGF2ZSBhIHJvbGUgYXMgdGhlIGRpcmVjdGlvbidzIGxpbWl0XHJcbiAgICAvLyAyLiBmb3IgdG9wIGFuZCBsZWZ0IGZpbmQgbWF4IHggfCB5IHZhbHVlcywgYW5kIG1pbiBmb3IgcmlnaHQgYW5kIGJvdHRvbVxyXG4gICAgdGhpcy5saW1pdERpcmVjdGlvbnMuZm9yRWFjaChkaXJlY3Rpb24gPT4ge1xyXG4gICAgICBjb25zdCByZWxldmFudFBvaW50cyA9IHRoaXMuX3BvaW50cy5maWx0ZXIocG9pbnQgPT4ge1xyXG4gICAgICAgIHJldHVybiBwb2ludC5yb2xlcy5pbmNsdWRlcyhkaXJlY3Rpb24pO1xyXG4gICAgICB9KVxyXG4gICAgICAgIC5tYXAoKHBvaW50OiBQb2ludFBvc2l0aW9uQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcG9pbnRbdGhpcy5nZXREaXJlY3Rpb25BeGlzKGRpcmVjdGlvbildO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBsZXQgbGltaXQ7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgbGltaXQgPSBNYXRoLm1heCguLi5yZWxldmFudFBvaW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgbGltaXQgPSBNYXRoLm1pbiguLi5yZWxldmFudFBvaW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fbGltaXRzW2RpcmVjdGlvbl0gPSBsaW1pdDtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubGltaXRzLm5leHQodGhpcy5fbGltaXRzKTtcclxuICAgIHRoaXMucG9zaXRpb25zLm5leHQoQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludFxyXG4gICAqIEBwYXJhbSBwb3NpdGlvbkNoYW5nZSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlOiBQb2ludFBvc2l0aW9uQ2hhbmdlKSB7XHJcbiAgICAvLyBmaW5kcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgYnkgaXQncyByb2xlcywgdGhhbiBzcGxpY2VzIGl0IGZvciB0aGUgbmV3IHBvc2l0aW9uIG9yIHB1c2hlcyBpdCBpZiBpdCdzIG5vdCB5ZXQgaW4gdGhlIGFycmF5XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX3BvaW50cy5maW5kSW5kZXgocG9pbnQgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXJyYXkocG9zaXRpb25DaGFuZ2Uucm9sZXMsIHBvaW50LnJvbGVzKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLl9wb2ludHMucHVzaChwb3NpdGlvbkNoYW5nZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wb2ludHMuc3BsaWNlKGluZGV4LCAxLCBwb3NpdGlvbkNoYW5nZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVjayBpZiBhIHBvc2l0aW9uIGNoYW5nZSBldmVudCBleGNlZWRzIHRoZSBsaW1pdHNcclxuICAgKiBAcGFyYW0gcG9zaXRpb25DaGFuZ2UgLSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIExpbWl0RXhjZXB0aW9uMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBleGNlZWRzTGltaXQocG9zaXRpb25DaGFuZ2U6IFBvaW50UG9zaXRpb25DaGFuZ2UpOiBMaW1pdEV4Y2VwdGlvbiB7XHJcbiAgICBjb25zdCBwb2ludExpbWl0cyA9IHRoaXMubGltaXREaXJlY3Rpb25zLmZpbHRlcihkaXJlY3Rpb24gPT4ge1xyXG4gICAgICByZXR1cm4gIXBvc2l0aW9uQ2hhbmdlLnJvbGVzLmluY2x1ZGVzKGRpcmVjdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbjogTGltaXRFeGNlcHRpb24gPSB7XHJcbiAgICAgIGV4Y2VlZHM6IGZhbHNlLFxyXG4gICAgICByZXNldENvZWZmaWNpZW50czoge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMFxyXG4gICAgICB9LFxyXG4gICAgICByZXNldENvb3JkaW5hdGVzOiB7XHJcbiAgICAgICAgeDogcG9zaXRpb25DaGFuZ2UueCxcclxuICAgICAgICB5OiBwb3NpdGlvbkNoYW5nZS55XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gbGltaXQgZGlyZWN0aW9ucyBhcmUgdGhlIG9wcG9zaXRlIHNpZGVzIG9mIHRoZSBwb2ludCdzIHJvbGVzXHJcbiAgICBwb2ludExpbWl0cy5mb3JFYWNoKGRpcmVjdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IGRpcmVjdGlvbkF4aXMgPSB0aGlzLmdldERpcmVjdGlvbkF4aXMoZGlyZWN0aW9uKTtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICBpZiAocG9zaXRpb25DaGFuZ2VbZGlyZWN0aW9uQXhpc10gPCB0aGlzLl9saW1pdHNbZGlyZWN0aW9uXSkge1xyXG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbZGlyZWN0aW9uQXhpc10gPSAxO1xyXG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlc1tkaXJlY3Rpb25BeGlzXSA9IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgfHwgZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbkNoYW5nZVtkaXJlY3Rpb25BeGlzXSA+IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dKSB7XHJcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50c1tkaXJlY3Rpb25BeGlzXSA9IC0xO1xyXG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlc1tkaXJlY3Rpb25BeGlzXSA9IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29lZmZpY2llbnRzLnggIT09IDAgfHwgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHMueSAhPT0gMCkge1xyXG4gICAgICBsaW1pdEV4Y2VwdGlvbi5leGNlZWRzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGltaXRFeGNlcHRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByb3RhdGUgY3JvcCB0b29sIHBvaW50cyBjbG9ja3dpc2VcclxuICAgKiBAcGFyYW0gcmVzaXplUmF0aW9zIC0gcmF0aW8gYmV0d2VlbiB0aGUgbmV3IGRpbWVuc2lvbnMgYW5kIHRoZSBwcmV2aW91c1xyXG4gICAqIEBwYXJhbSBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMgLSBwcmV2aWV3IHBhbmUgZGltZW5zaW9ucyBiZWZvcmUgcm90YXRpb25cclxuICAgKiBAcGFyYW0gaW5pdGlhbFBvc2l0aW9ucyAtIGN1cnJlbnQgcG9zaXRpb25zIGJlZm9yZSByb3RhdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyByb3RhdGVDbG9ja3dpc2UocmVzaXplUmF0aW9zLCBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMsIGluaXRpYWxQb3NpdGlvbnM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+KSB7XHJcbiAgICAvLyBjb252ZXJ0IHBvc2l0aW9ucyB0byByYXRpbyBiZXR3ZWVuIHBvc2l0aW9uIHRvIGluaXRpYWwgcGFuZSBkaW1lbnNpb25cclxuICAgIGluaXRpYWxQb3NpdGlvbnMgPSBpbml0aWFsUG9zaXRpb25zLm1hcChwb2ludCA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHtcclxuICAgICAgICB4OiBwb2ludC54IC8gaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgIHk6IHBvaW50LnkgLyBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0LFxyXG4gICAgICB9LCBwb2ludC5yb2xlcyk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVwb3NpdGlvblBvaW50cyhpbml0aWFsUG9zaXRpb25zLm1hcChwb2ludCA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0ZUNvcm5lckNsb2Nrd2lzZShwb2ludCk7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm5zIHRoZSBjb3JuZXIgcG9zaXRpb25zIGFmdGVyIGEgOTAgZGVncmVlcyBjbG9ja3dpc2Ugcm90YXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJvdGF0ZUNvcm5lckNsb2Nrd2lzZShjb3JuZXI6IFBvaW50UG9zaXRpb25DaGFuZ2UpOiBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcclxuICAgIGNvbnN0IHJvdGF0ZWQ6IFBvaW50UG9zaXRpb25DaGFuZ2UgPSB7XHJcbiAgICAgIHg6IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoICogKDEgLSBjb3JuZXIueSksXHJcbiAgICAgIHk6IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCAqIGNvcm5lci54LFxyXG4gICAgICByb2xlczogW11cclxuICAgIH07XHJcbiAgICAvLyByb3RhdGVzIGNvcm5lciBhY2NvcmRpbmcgdG8gb3JkZXJcclxuICAgIGNvbnN0IG9yZGVyOiBBcnJheTxSb2xlc0FycmF5PiA9IFtcclxuICAgICAgWydib3R0b20nLCAnbGVmdCddLFxyXG4gICAgICBbJ3RvcCcsICdsZWZ0J10sXHJcbiAgICAgIFsndG9wJywgJ3JpZ2h0J10sXHJcbiAgICAgIFsnYm90dG9tJywgJ3JpZ2h0J10sXHJcbiAgICAgIFsnYm90dG9tJywgJ2xlZnQnXVxyXG4gICAgXTtcclxuICAgIHJvdGF0ZWQucm9sZXMgPSBvcmRlcltvcmRlci5maW5kSW5kZXgocm9sZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXJyYXkocm9sZXMsIGNvcm5lci5yb2xlcyk7XHJcbiAgICB9KSArIDFdO1xyXG4gICAgcmV0dXJuIHJvdGF0ZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVja3MgaWYgdHdvIGFycmF5IGNvbnRhaW4gdGhlIHNhbWUgdmFsdWVzXHJcbiAgICogQHBhcmFtIGFycmF5MSAtIGFycmF5IDFcclxuICAgKiBAcGFyYW0gYXJyYXkyIC0gYXJyYXkgMlxyXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cclxuICAgKi9cclxuICBwdWJsaWMgY29tcGFyZUFycmF5KGFycmF5MTogQXJyYXk8c3RyaW5nPiwgYXJyYXkyOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gYXJyYXkxLmV2ZXJ5KChlbGVtZW50KSA9PiB7XHJcbiAgICAgIHJldHVybiBhcnJheTIuaW5jbHVkZXMoZWxlbWVudCk7XHJcbiAgICB9KSAmJiBhcnJheTEubGVuZ3RoID09PSBhcnJheTIubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXREaXJlY3Rpb25BeGlzKGRpcmVjdGlvbikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogJ3gnLFxyXG4gICAgICByaWdodDogJ3gnLFxyXG4gICAgICB0b3A6ICd5JyxcclxuICAgICAgYm90dG9tOiAneSdcclxuICAgIH1bZGlyZWN0aW9uXTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50UG9zaXRpb25DaGFuZ2Uge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgcm9sZXM6IFJvbGVzQXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJlYUxpbWl0cyB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgcmlnaHQ6IG51bWJlcjtcclxuICBsZWZ0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFJvbGVzQXJyYXkgPSBBcnJheTxEaXJlY3Rpb24+O1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uQ2hhbmdlRGF0YSBpbXBsZW1lbnRzIFBvaW50UG9zaXRpb25DaGFuZ2Uge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgcm9sZXM6IFJvbGVzQXJyYXk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBYWVBvc2l0aW9uLCByb2xlczogUm9sZXNBcnJheSkge1xyXG4gICAgdGhpcy54ID0gcG9zaXRpb24ueDtcclxuICAgIHRoaXMueSA9IHBvc2l0aW9uLnk7XHJcbiAgICB0aGlzLnJvbGVzID0gcm9sZXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBEaXJlY3Rpb24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJztcclxuIl19