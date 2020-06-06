import { BehaviorSubject } from 'rxjs';
import { ImageDimensions } from '../PublicModels';
import { LimitException, XYPosition } from '../PrivateModels';
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
