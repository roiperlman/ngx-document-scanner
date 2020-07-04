import { AfterViewInit } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
import { ImageDimensions } from '../../PublicModels';
export declare class NgxShapeOutlineComponent implements AfterViewInit {
    private limitsService;
    color: string;
    weight: number;
    dimensions: ImageDimensions;
    canvas: any;
    private _points;
    private _sortedPoints;
    constructor(limitsService: LimitsService);
    ngAfterViewInit(): void;
    /**
     * clears the shape canvas
     */
    private clearCanvas;
    /**
     * sorts the array of points according to their clockwise alignment
     */
    private sortPoints;
    /**
     * draws a line between the points according to their order
     */
    private drawShape;
}
