import { AfterViewInit } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
import { ImageDimensions } from '../../PublicModels';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxShapeOutlineComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxShapeOutlineComponent, "ngx-shape-outine", never, { "color": "color"; "weight": "weight"; "dimensions": "dimensions"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbIm5neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaW1pdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW1hZ2VEaW1lbnNpb25zIH0gZnJvbSAnLi4vLi4vUHVibGljTW9kZWxzJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgbGltaXRzU2VydmljZTtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIHdlaWdodDogbnVtYmVyO1xuICAgIGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgICBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIF9wb2ludHM7XG4gICAgcHJpdmF0ZSBfc29ydGVkUG9pbnRzO1xuICAgIGNvbnN0cnVjdG9yKGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpO1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIGNsZWFycyB0aGUgc2hhcGUgY2FudmFzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjbGVhckNhbnZhcztcbiAgICAvKipcbiAgICAgKiBzb3J0cyB0aGUgYXJyYXkgb2YgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBjbG9ja3dpc2UgYWxpZ25tZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBzb3J0UG9pbnRzO1xuICAgIC8qKlxuICAgICAqIGRyYXdzIGEgbGluZSBiZXR3ZWVuIHRoZSBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIG9yZGVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3U2hhcGU7XG59XG4iXX0=