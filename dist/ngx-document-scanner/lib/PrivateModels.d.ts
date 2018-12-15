/**
 * describes an editor button
 */
import { RolesArray } from './services/limits.service';
export interface EditorActionButton {
    name: string;
    type?: 'button' | 'fab';
    icon: string;
    action: Function;
    text?: string;
    mode?: 'crop' | 'color';
}
/**
 * a string describing the shape of a draggable point
 */
export declare type PointShape = 'rect' | 'circle';
export interface DraggablePointConfig {
    width?: number;
    height?: number;
    color?: string;
    shape?: 'rect' | 'circle';
    limitRoles?: RolesArray;
    startPosition?: XYPosition;
}
/**
 * describes a position on a 2d pane
 */
export interface XYPosition {
    x: number;
    y: number;
}
/**
 * describes o draggable point config options
 */
export interface PointOptions {
    width: number;
    height: number;
    color: string;
    shape: PointShape;
}
export interface LimitException {
    exceeds: boolean;
    resetCoefficients: {
        x: 1 | 0 | -1;
        y: 1 | 0 | -1;
    };
    resetCoordinates: {
        x: number;
        y: number;
    };
}
