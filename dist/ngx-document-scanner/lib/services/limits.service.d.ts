import { BehaviorSubject } from 'rxjs';
import { ImageDimensions } from '../PublicModels';
import { LimitException, XYPosition } from '../PrivateModels';
import * as ɵngcc0 from '@angular/core';
export declare class LimitsService {
    private limitDirections;
    /**
     * stores the crop limits limits
     */
    private _limits;
    /**
     * stores the array of the draggable points displayed on the crop area
     */
    private _points;
    /**
     * stores the pane dimensions
     */
    private _paneDimensions;
    positions: BehaviorSubject<Array<PointPositionChange>>;
    repositionEvent: BehaviorSubject<Array<PointPositionChange>>;
    limits: BehaviorSubject<AreaLimits>;
    paneDimensions: BehaviorSubject<ImageDimensions>;
    constructor();
    /**
     * set privew pane dimensions
     */
    setPaneDimensions(dimensions: ImageDimensions): Promise<unknown>;
    /**
     * repositions points externally
     */
    repositionPoints(positions: any): void;
    /**
     * updates limits and point positions and calls next on the observables
     * @param positionChangeData - position change event data
     */
    positionChange(positionChangeData: PointPositionChange): void;
    /**
     * updates the position of the point
     * @param positionChange - position change event data
     */
    updatePosition(positionChange: PointPositionChange): void;
    /**
     * check if a position change event exceeds the limits
     * @param positionChange - position change event data
     * @returns LimitException0
     */
    exceedsLimit(positionChange: PointPositionChange): LimitException;
    /**
     * rotate crop tool points clockwise
     * @param resizeRatios - ratio between the new dimensions and the previous
     * @param initialPreviewDimensions - preview pane dimensions before rotation
     * @param initialPositions - current positions before rotation
     */
    rotateClockwise(resizeRatios: any, initialPreviewDimensions: any, initialPositions: Array<PointPositionChange>): void;
    /**
     * returns the corner positions after a 90 degrees clockwise rotation
     */
    private rotateCornerClockwise;
    /**
     * checks if two array contain the same values
     * @param array1 - array 1
     * @param array2 - array 2
     * @returns boolean
     */
    compareArray(array1: Array<string>, array2: Array<string>): boolean;
    private getDirectionAxis;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<LimitsService, never>;
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
export declare type RolesArray = Array<Direction>;
export declare class PositionChangeData implements PointPositionChange {
    x: number;
    y: number;
    roles: RolesArray;
    constructor(position: XYPosition, roles: RolesArray);
}
export declare type Direction = 'left' | 'right' | 'top' | 'bottom';

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsibGltaXRzLnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbWFnZURpbWVuc2lvbnMgfSBmcm9tICcuLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHsgTGltaXRFeGNlcHRpb24sIFhZUG9zaXRpb24gfSBmcm9tICcuLi9Qcml2YXRlTW9kZWxzJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIExpbWl0c1NlcnZpY2Uge1xuICAgIHByaXZhdGUgbGltaXREaXJlY3Rpb25zO1xuICAgIC8qKlxuICAgICAqIHN0b3JlcyB0aGUgY3JvcCBsaW1pdHMgbGltaXRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBfbGltaXRzO1xuICAgIC8qKlxuICAgICAqIHN0b3JlcyB0aGUgYXJyYXkgb2YgdGhlIGRyYWdnYWJsZSBwb2ludHMgZGlzcGxheWVkIG9uIHRoZSBjcm9wIGFyZWFcbiAgICAgKi9cbiAgICBwcml2YXRlIF9wb2ludHM7XG4gICAgLyoqXG4gICAgICogc3RvcmVzIHRoZSBwYW5lIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIF9wYW5lRGltZW5zaW9ucztcbiAgICBwb3NpdGlvbnM6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPj47XG4gICAgcmVwb3NpdGlvbkV2ZW50OiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+O1xuICAgIGxpbWl0czogQmVoYXZpb3JTdWJqZWN0PEFyZWFMaW1pdHM+O1xuICAgIHBhbmVEaW1lbnNpb25zOiBCZWhhdmlvclN1YmplY3Q8SW1hZ2VEaW1lbnNpb25zPjtcbiAgICBjb25zdHJ1Y3RvcigpO1xuICAgIC8qKlxuICAgICAqIHNldCBwcml2ZXcgcGFuZSBkaW1lbnNpb25zXG4gICAgICovXG4gICAgc2V0UGFuZURpbWVuc2lvbnMoZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zKTogUHJvbWlzZTx1bmtub3duPjtcbiAgICAvKipcbiAgICAgKiByZXBvc2l0aW9ucyBwb2ludHMgZXh0ZXJuYWxseVxuICAgICAqL1xuICAgIHJlcG9zaXRpb25Qb2ludHMocG9zaXRpb25zOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHVwZGF0ZXMgbGltaXRzIGFuZCBwb2ludCBwb3NpdGlvbnMgYW5kIGNhbGxzIG5leHQgb24gdGhlIG9ic2VydmFibGVzXG4gICAgICogQHBhcmFtIHBvc2l0aW9uQ2hhbmdlRGF0YSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXG4gICAgICovXG4gICAgcG9zaXRpb25DaGFuZ2UocG9zaXRpb25DaGFuZ2VEYXRhOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiB1cGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25DaGFuZ2UgLSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBhIHBvc2l0aW9uIGNoYW5nZSBldmVudCBleGNlZWRzIHRoZSBsaW1pdHNcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25DaGFuZ2UgLSBwb3NpdGlvbiBjaGFuZ2UgZXZlbnQgZGF0YVxuICAgICAqIEByZXR1cm5zIExpbWl0RXhjZXB0aW9uMFxuICAgICAqL1xuICAgIGV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZTogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IExpbWl0RXhjZXB0aW9uO1xuICAgIC8qKlxuICAgICAqIHJvdGF0ZSBjcm9wIHRvb2wgcG9pbnRzIGNsb2Nrd2lzZVxuICAgICAqIEBwYXJhbSByZXNpemVSYXRpb3MgLSByYXRpbyBiZXR3ZWVuIHRoZSBuZXcgZGltZW5zaW9ucyBhbmQgdGhlIHByZXZpb3VzXG4gICAgICogQHBhcmFtIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucyAtIHByZXZpZXcgcGFuZSBkaW1lbnNpb25zIGJlZm9yZSByb3RhdGlvblxuICAgICAqIEBwYXJhbSBpbml0aWFsUG9zaXRpb25zIC0gY3VycmVudCBwb3NpdGlvbnMgYmVmb3JlIHJvdGF0aW9uXG4gICAgICovXG4gICAgcm90YXRlQ2xvY2t3aXNlKHJlc2l6ZVJhdGlvczogYW55LCBpbml0aWFsUHJldmlld0RpbWVuc2lvbnM6IGFueSwgaW5pdGlhbFBvc2l0aW9uczogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIGNvcm5lciBwb3NpdGlvbnMgYWZ0ZXIgYSA5MCBkZWdyZWVzIGNsb2Nrd2lzZSByb3RhdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgcm90YXRlQ29ybmVyQ2xvY2t3aXNlO1xuICAgIC8qKlxuICAgICAqIGNoZWNrcyBpZiB0d28gYXJyYXkgY29udGFpbiB0aGUgc2FtZSB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gYXJyYXkxIC0gYXJyYXkgMVxuICAgICAqIEBwYXJhbSBhcnJheTIgLSBhcnJheSAyXG4gICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICAqL1xuICAgIGNvbXBhcmVBcnJheShhcnJheTE6IEFycmF5PHN0cmluZz4sIGFycmF5MjogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBnZXREaXJlY3Rpb25BeGlzO1xufVxuZXhwb3J0IGludGVyZmFjZSBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHJvbGVzOiBSb2xlc0FycmF5O1xufVxuZXhwb3J0IGludGVyZmFjZSBBcmVhTGltaXRzIHtcbiAgICB0b3A6IG51bWJlcjtcbiAgICBib3R0b206IG51bWJlcjtcbiAgICByaWdodDogbnVtYmVyO1xuICAgIGxlZnQ6IG51bWJlcjtcbn1cbmV4cG9ydCBkZWNsYXJlIHR5cGUgUm9sZXNBcnJheSA9IEFycmF5PERpcmVjdGlvbj47XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQb3NpdGlvbkNoYW5nZURhdGEgaW1wbGVtZW50cyBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHJvbGVzOiBSb2xlc0FycmF5O1xuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBYWVBvc2l0aW9uLCByb2xlczogUm9sZXNBcnJheSk7XG59XG5leHBvcnQgZGVjbGFyZSB0eXBlIERpcmVjdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nO1xuIl19