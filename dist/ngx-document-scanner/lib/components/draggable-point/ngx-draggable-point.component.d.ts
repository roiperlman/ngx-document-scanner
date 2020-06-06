import { AfterViewInit } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
import { XYPosition } from '../../PrivateModels';
import * as ɵngcc0 from '@angular/core';
export declare class NgxDraggablePointComponent implements AfterViewInit {
    private limitsService;
    width: number;
    height: number;
    color: string;
    shape: 'rect' | 'circle';
    pointOptions: 'rect' | 'circle';
    limitRoles: Array<'left' | 'right' | 'top' | 'bottom'>;
    startPosition: XYPosition;
    container: HTMLElement;
    private _currentPosition;
    position: XYPosition;
    private _paneDimensions;
    resetPosition: XYPosition;
    constructor(limitsService: LimitsService);
    ngAfterViewInit(): void;
    /**
     * returns a css style object for the point
     */
    pointStyle(): {
        width: string;
        height: string;
        'background-color': string;
        'border-radius': string | number;
        position: string;
    };
    /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param position - the current position of the point
     */
    positionChange(position: XYPosition): void;
    /**
     * adjusts the position of the point after a limit exception
     */
    private adjustPosition;
    /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     */
    movementEnd(position: XYPosition): void;
    /**
     * calculates the initial positions of the point by it's roles
     * @param dimensions - dimensions of the pane in which the point is located
     */
    private getInitialPosition;
    /**
     * repositions the point after an external reposition event
     * @param positions - an array of all points on the pane
     */
    private externalReposition;
    /**
     * returns a new point position if the movement exceeded the pane limit
     */
    private enforcePaneLimits;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxDraggablePointComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxDraggablePointComponent, "ngx-draggable-point", never, { "width": "width"; "height": "height"; "color": "color"; "shape": "shape"; "pointOptions": "pointOptions"; "_currentPosition": "_currentPosition"; "limitRoles": "limitRoles"; "startPosition": "startPosition"; "container": "container"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaW1pdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgWFlQb3NpdGlvbiB9IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBwcml2YXRlIGxpbWl0c1NlcnZpY2U7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIHNoYXBlOiAncmVjdCcgfCAnY2lyY2xlJztcbiAgICBwb2ludE9wdGlvbnM6ICdyZWN0JyB8ICdjaXJjbGUnO1xuICAgIGxpbWl0Um9sZXM6IEFycmF5PCdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nPjtcbiAgICBzdGFydFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY3VycmVudFBvc2l0aW9uO1xuICAgIHBvc2l0aW9uOiBYWVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX3BhbmVEaW1lbnNpb25zO1xuICAgIHJlc2V0UG9zaXRpb246IFhZUG9zaXRpb247XG4gICAgY29uc3RydWN0b3IobGltaXRzU2VydmljZTogTGltaXRzU2VydmljZSk7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIGNzcyBzdHlsZSBvYmplY3QgZm9yIHRoZSBwb2ludFxuICAgICAqL1xuICAgIHBvaW50U3R5bGUoKToge1xuICAgICAgICB3aWR0aDogc3RyaW5nO1xuICAgICAgICBoZWlnaHQ6IHN0cmluZztcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBzdHJpbmc7XG4gICAgICAgICdib3JkZXItcmFkaXVzJzogc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICBwb3NpdGlvbjogc3RyaW5nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVnaXN0ZXJzIGEgcG9zaXRpb24gY2hhbmdlIG9uIHRoZSBsaW1pdHMgc2VydmljZSwgYW5kIGFkanVzdHMgcG9zaXRpb24gaWYgbmVjZXNzYXJ5XG4gICAgICogQHBhcmFtIHBvc2l0aW9uIC0gdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBvaW50XG4gICAgICovXG4gICAgcG9zaXRpb25DaGFuZ2UocG9zaXRpb246IFhZUG9zaXRpb24pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIGFkanVzdHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBhZnRlciBhIGxpbWl0IGV4Y2VwdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0UG9zaXRpb247XG4gICAgLyoqXG4gICAgICogY2FsbGVkIG9uIG1vdmVtZW50IGVuZCwgY2hlY2tzIGlmIGxhc3QgcG9zaXRpb24gZXhjZWVkZWQgdGhlIGxpbWl0cyBhZCBhZGp1c3RzXG4gICAgICovXG4gICAgbW92ZW1lbnRFbmQocG9zaXRpb246IFhZUG9zaXRpb24pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIGNhbGN1bGF0ZXMgdGhlIGluaXRpYWwgcG9zaXRpb25zIG9mIHRoZSBwb2ludCBieSBpdCdzIHJvbGVzXG4gICAgICogQHBhcmFtIGRpbWVuc2lvbnMgLSBkaW1lbnNpb25zIG9mIHRoZSBwYW5lIGluIHdoaWNoIHRoZSBwb2ludCBpcyBsb2NhdGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb247XG4gICAgLyoqXG4gICAgICogcmVwb3NpdGlvbnMgdGhlIHBvaW50IGFmdGVyIGFuIGV4dGVybmFsIHJlcG9zaXRpb24gZXZlbnRcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25zIC0gYW4gYXJyYXkgb2YgYWxsIHBvaW50cyBvbiB0aGUgcGFuZVxuICAgICAqL1xuICAgIHByaXZhdGUgZXh0ZXJuYWxSZXBvc2l0aW9uO1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBuZXcgcG9pbnQgcG9zaXRpb24gaWYgdGhlIG1vdmVtZW50IGV4Y2VlZGVkIHRoZSBwYW5lIGxpbWl0XG4gICAgICovXG4gICAgcHJpdmF0ZSBlbmZvcmNlUGFuZUxpbWl0cztcbn1cbiJdfQ==