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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQU9yQyxNQUFNLE9BQU8sYUFBYTtJQThCeEI7UUEzQlEsb0JBQWUsR0FBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7O1FBSWpFLFlBQU8sR0FBRztZQUNoQixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7Ozs7UUFJTSxZQUFPLEdBQStCLEVBQUUsQ0FBQzs7OztRQVMxQyxjQUFTLEdBQWdELElBQUksZUFBZSxDQUE2QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25JLG9CQUFlLEdBQWdELElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUNuSCxXQUFNLEdBQWdDLElBQUksZUFBZSxDQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRixtQkFBYyxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFHckcsQ0FBQzs7Ozs7O0lBS00saUJBQWlCLENBQUMsVUFBMkI7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FB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WUFBWSxRQUFvQixFQUFFLEtBQWlCO1FBQ2pELElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGOzs7SUFUQywrQkFBVTs7SUFDViwrQkFBVTs7SUFDVixtQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uL1B1YmxpY01vZGVscyc7XG5pbXBvcnQge0xpbWl0RXhjZXB0aW9uLCBYWVBvc2l0aW9ufSBmcm9tICcuLi9Qcml2YXRlTW9kZWxzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGltaXRzU2VydmljZSB7XG5cblxuICBwcml2YXRlIGxpbWl0RGlyZWN0aW9uczogUm9sZXNBcnJheSA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGNyb3AgbGltaXRzIGxpbWl0c1xuICAgKi9cbiAgcHJpdmF0ZSBfbGltaXRzID0ge1xuICAgIHRvcDogMCxcbiAgICBib3R0b206IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgbGVmdDogMFxuICB9O1xuICAvKipcbiAgICogc3RvcmVzIHRoZSBhcnJheSBvZiB0aGUgZHJhZ2dhYmxlIHBvaW50cyBkaXNwbGF5ZWQgb24gdGhlIGNyb3AgYXJlYVxuICAgKi9cbiAgcHJpdmF0ZSBfcG9pbnRzOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPiA9IFtdO1xuICAvKipcbiAgICogc3RvcmVzIHRoZSBwYW5lIGRpbWVuc2lvbnNcbiAgICovXG4gIHByaXZhdGUgX3BhbmVEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XG5cbiAgLy8gKioqKioqKioqKiogLy9cbiAgLy8gT2JzZXJ2YWJsZXMgLy9cbiAgLy8gKioqKioqKioqKiogLy9cbiAgcHVibGljIHBvc2l0aW9uczogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+KEFycmF5LmZyb20odGhpcy5fcG9pbnRzKSk7XG4gIHB1YmxpYyByZXBvc2l0aW9uRXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+PihbXSk7XG4gIHB1YmxpYyBsaW1pdHM6IEJlaGF2aW9yU3ViamVjdDxBcmVhTGltaXRzPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJlYUxpbWl0cz4odGhpcy5fbGltaXRzKTtcbiAgcHVibGljIHBhbmVEaW1lbnNpb25zOiBCZWhhdmlvclN1YmplY3Q8SW1hZ2VEaW1lbnNpb25zPiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgcHJpdmV3IHBhbmUgZGltZW5zaW9uc1xuICAgKi9cbiAgcHVibGljIHNldFBhbmVEaW1lbnNpb25zKGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9wYW5lRGltZW5zaW9ucyA9IGRpbWVuc2lvbnM7XG4gICAgICB0aGlzLnBhbmVEaW1lbnNpb25zLm5leHQoZGltZW5zaW9ucyk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVwb3NpdGlvbnMgcG9pbnRzIGV4dGVybmFsbHlcbiAgICovXG4gIHB1YmxpYyByZXBvc2l0aW9uUG9pbnRzKHBvc2l0aW9ucykge1xuICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcbiAgICBwb3NpdGlvbnMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XG4gICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlcG9zaXRpb25FdmVudC5uZXh0KHBvc2l0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlcyBsaW1pdHMgYW5kIHBvaW50IHBvc2l0aW9ucyBhbmQgY2FsbHMgbmV4dCBvbiB0aGUgb2JzZXJ2YWJsZXNcbiAgICogQHBhcmFtIHBvc2l0aW9uQ2hhbmdlRGF0YSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXG4gICAqL1xuICBwdWJsaWMgcG9zaXRpb25DaGFuZ2UocG9zaXRpb25DaGFuZ2VEYXRhOiBQb2ludFBvc2l0aW9uQ2hhbmdlKSB7XG4gICAgLy8gdXBkYXRlIHBvc2l0aW9ucyBhY2NvcmRpbmcgdG8gY3VycmVudCBwb3NpdGlvbiBjaGFuZ2VcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG5cbiAgICAvLyBmb3IgZWFjaCBkaXJlY3Rpb246XG4gICAgLy8gMS4gZmlsdGVyIHRoZSBfcG9pbnRzIHRoYXQgaGF2ZSBhIHJvbGUgYXMgdGhlIGRpcmVjdGlvbidzIGxpbWl0XG4gICAgLy8gMi4gZm9yIHRvcCBhbmQgbGVmdCBmaW5kIG1heCB4IHwgeSB2YWx1ZXMsIGFuZCBtaW4gZm9yIHJpZ2h0IGFuZCBib3R0b21cbiAgICB0aGlzLmxpbWl0RGlyZWN0aW9ucy5mb3JFYWNoKGRpcmVjdGlvbiA9PiB7XG4gICAgICBjb25zdCByZWxldmFudFBvaW50cyA9IHRoaXMuX3BvaW50cy5maWx0ZXIocG9pbnQgPT4ge1xuICAgICAgICByZXR1cm4gcG9pbnQucm9sZXMuaW5jbHVkZXMoZGlyZWN0aW9uKTtcbiAgICAgIH0pXG4gICAgICAgIC5tYXAoKHBvaW50OiBQb2ludFBvc2l0aW9uQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHBvaW50W3RoaXMuZ2V0RGlyZWN0aW9uQXhpcyhkaXJlY3Rpb24pXTtcbiAgICAgICAgfSk7XG4gICAgICBsZXQgbGltaXQ7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAndG9wJyB8fCBkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICBsaW1pdCA9IE1hdGgubWF4KC4uLnJlbGV2YW50UG9pbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgfHwgZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICBsaW1pdCA9IE1hdGgubWluKC4uLnJlbGV2YW50UG9pbnRzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dID0gbGltaXQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxpbWl0cy5uZXh0KHRoaXMuX2xpbWl0cyk7XG4gICAgdGhpcy5wb3NpdGlvbnMubmV4dChBcnJheS5mcm9tKHRoaXMuX3BvaW50cykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludFxuICAgKiBAcGFyYW0gcG9zaXRpb25DaGFuZ2UgLSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZGF0YVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlOiBQb2ludFBvc2l0aW9uQ2hhbmdlKSB7XG4gICAgLy8gZmluZHMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBvaW50IGJ5IGl0J3Mgcm9sZXMsIHRoYW4gc3BsaWNlcyBpdCBmb3IgdGhlIG5ldyBwb3NpdGlvbiBvciBwdXNoZXMgaXQgaWYgaXQncyBub3QgeWV0IGluIHRoZSBhcnJheVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fcG9pbnRzLmZpbmRJbmRleChwb2ludCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXJyYXkocG9zaXRpb25DaGFuZ2Uucm9sZXMsIHBvaW50LnJvbGVzKTtcbiAgICB9KTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLl9wb2ludHMucHVzaChwb3NpdGlvbkNoYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BvaW50cy5zcGxpY2UoaW5kZXgsIDEsIHBvc2l0aW9uQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgaWYgYSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZXhjZWVkcyB0aGUgbGltaXRzXG4gICAqIEBwYXJhbSBwb3NpdGlvbkNoYW5nZSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXG4gICAqIEByZXR1cm5zIExpbWl0RXhjZXB0aW9uMFxuICAgKi9cbiAgcHVibGljIGV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZTogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IExpbWl0RXhjZXB0aW9uIHtcbiAgICBjb25zdCBwb2ludExpbWl0cyA9IHRoaXMubGltaXREaXJlY3Rpb25zLmZpbHRlcihkaXJlY3Rpb24gPT4ge1xuICAgICAgcmV0dXJuICFwb3NpdGlvbkNoYW5nZS5yb2xlcy5pbmNsdWRlcyhkaXJlY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGltaXRFeGNlcHRpb246IExpbWl0RXhjZXB0aW9uID0ge1xuICAgICAgZXhjZWVkczogZmFsc2UsXG4gICAgICByZXNldENvZWZmaWNpZW50czoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAgcmVzZXRDb29yZGluYXRlczoge1xuICAgICAgICB4OiBwb3NpdGlvbkNoYW5nZS54LFxuICAgICAgICB5OiBwb3NpdGlvbkNoYW5nZS55XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGxpbWl0IGRpcmVjdGlvbnMgYXJlIHRoZSBvcHBvc2l0ZSBzaWRlcyBvZiB0aGUgcG9pbnQncyByb2xlc1xuICAgIHBvaW50TGltaXRzLmZvckVhY2goZGlyZWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbkF4aXMgPSB0aGlzLmdldERpcmVjdGlvbkF4aXMoZGlyZWN0aW9uKTtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbkNoYW5nZVtkaXJlY3Rpb25BeGlzXSA8IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dKSB7XG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbZGlyZWN0aW9uQXhpc10gPSAxO1xuICAgICAgICAgIGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXNbZGlyZWN0aW9uQXhpc10gPSB0aGlzLl9saW1pdHNbZGlyZWN0aW9uXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcgfHwgZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICBpZiAocG9zaXRpb25DaGFuZ2VbZGlyZWN0aW9uQXhpc10gPiB0aGlzLl9saW1pdHNbZGlyZWN0aW9uXSkge1xuICAgICAgICAgIGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29lZmZpY2llbnRzW2RpcmVjdGlvbkF4aXNdID0gLTE7XG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlc1tkaXJlY3Rpb25BeGlzXSA9IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHMueCAhPT0gMCB8fCBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50cy55ICE9PSAwKSB7XG4gICAgICBsaW1pdEV4Y2VwdGlvbi5leGNlZWRzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGltaXRFeGNlcHRpb247XG4gIH1cblxuICAvKipcbiAgICogcm90YXRlIGNyb3AgdG9vbCBwb2ludHMgY2xvY2t3aXNlXG4gICAqIEBwYXJhbSByZXNpemVSYXRpb3MgLSByYXRpbyBiZXR3ZWVuIHRoZSBuZXcgZGltZW5zaW9ucyBhbmQgdGhlIHByZXZpb3VzXG4gICAqIEBwYXJhbSBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMgLSBwcmV2aWV3IHBhbmUgZGltZW5zaW9ucyBiZWZvcmUgcm90YXRpb25cbiAgICogQHBhcmFtIGluaXRpYWxQb3NpdGlvbnMgLSBjdXJyZW50IHBvc2l0aW9ucyBiZWZvcmUgcm90YXRpb25cbiAgICovXG4gIHB1YmxpYyByb3RhdGVDbG9ja3dpc2UocmVzaXplUmF0aW9zLCBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMsIGluaXRpYWxQb3NpdGlvbnM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+KSB7XG4gICAgLy8gY29udmVydCBwb3NpdGlvbnMgdG8gcmF0aW8gYmV0d2VlbiBwb3NpdGlvbiB0byBpbml0aWFsIHBhbmUgZGltZW5zaW9uXG4gICAgaW5pdGlhbFBvc2l0aW9ucyA9IGluaXRpYWxQb3NpdGlvbnMubWFwKHBvaW50ID0+IHtcbiAgICAgIHJldHVybiBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHtcbiAgICAgICAgeDogcG9pbnQueCAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgeTogcG9pbnQueSAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy5oZWlnaHQsXG4gICAgICB9LCBwb2ludC5yb2xlcyk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXBvc2l0aW9uUG9pbnRzKGluaXRpYWxQb3NpdGlvbnMubWFwKHBvaW50ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0ZUNvcm5lckNsb2Nrd2lzZShwb2ludCk7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgdGhlIGNvcm5lciBwb3NpdGlvbnMgYWZ0ZXIgYSA5MCBkZWdyZWVzIGNsb2Nrd2lzZSByb3RhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSByb3RhdGVDb3JuZXJDbG9ja3dpc2UoY29ybmVyOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogUG9pbnRQb3NpdGlvbkNoYW5nZSB7XG4gICAgY29uc3Qgcm90YXRlZDogUG9pbnRQb3NpdGlvbkNoYW5nZSA9IHtcbiAgICAgIHg6IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoICogKDEgLSBjb3JuZXIueSksXG4gICAgICB5OiB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQgKiBjb3JuZXIueCxcbiAgICAgIHJvbGVzOiBbXVxuICAgIH07XG4gICAgLy8gcm90YXRlcyBjb3JuZXIgYWNjb3JkaW5nIHRvIG9yZGVyXG4gICAgY29uc3Qgb3JkZXI6IEFycmF5PFJvbGVzQXJyYXk+ID0gW1xuICAgICAgWydib3R0b20nLCAnbGVmdCddLFxuICAgICAgWyd0b3AnLCAnbGVmdCddLFxuICAgICAgWyd0b3AnLCAncmlnaHQnXSxcbiAgICAgIFsnYm90dG9tJywgJ3JpZ2h0J10sXG4gICAgICBbJ2JvdHRvbScsICdsZWZ0J11cbiAgICBdO1xuICAgIHJvdGF0ZWQucm9sZXMgPSBvcmRlcltvcmRlci5maW5kSW5kZXgocm9sZXMgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZUFycmF5KHJvbGVzLCBjb3JuZXIucm9sZXMpO1xuICAgIH0pICsgMV07XG4gICAgcmV0dXJuIHJvdGF0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tzIGlmIHR3byBhcnJheSBjb250YWluIHRoZSBzYW1lIHZhbHVlc1xuICAgKiBAcGFyYW0gYXJyYXkxIC0gYXJyYXkgMVxuICAgKiBAcGFyYW0gYXJyYXkyIC0gYXJyYXkgMlxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBwdWJsaWMgY29tcGFyZUFycmF5KGFycmF5MTogQXJyYXk8c3RyaW5nPiwgYXJyYXkyOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFycmF5MS5ldmVyeSgoZWxlbWVudCkgPT4ge1xuICAgICAgcmV0dXJuIGFycmF5Mi5pbmNsdWRlcyhlbGVtZW50KTtcbiAgICB9KSAmJiBhcnJheTEubGVuZ3RoID09PSBhcnJheTIubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREaXJlY3Rpb25BeGlzKGRpcmVjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OiAneCcsXG4gICAgICByaWdodDogJ3gnLFxuICAgICAgdG9wOiAneScsXG4gICAgICBib3R0b206ICd5J1xuICAgIH1bZGlyZWN0aW9uXTtcbiAgfVxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnRQb3NpdGlvbkNoYW5nZSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICByb2xlczogUm9sZXNBcnJheTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcmVhTGltaXRzIHtcbiAgdG9wOiBudW1iZXI7XG4gIGJvdHRvbTogbnVtYmVyO1xuICByaWdodDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFJvbGVzQXJyYXkgPSBBcnJheTxEaXJlY3Rpb24+O1xuXG5leHBvcnQgY2xhc3MgUG9zaXRpb25DaGFuZ2VEYXRhIGltcGxlbWVudHMgUG9pbnRQb3NpdGlvbkNoYW5nZSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICByb2xlczogUm9sZXNBcnJheTtcblxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogWFlQb3NpdGlvbiwgcm9sZXM6IFJvbGVzQXJyYXkpIHtcbiAgICB0aGlzLnggPSBwb3NpdGlvbi54O1xuICAgIHRoaXMueSA9IHBvc2l0aW9uLnk7XG4gICAgdGhpcy5yb2xlcyA9IHJvbGVzO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIERpcmVjdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nO1xuIl19