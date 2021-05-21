/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/filter-menu/ngx-filter-menu.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
export class NgxFilterMenuComponent {
    /**
     * @param {?} bottomSheetRef
     * @param {?} data
     */
    constructor(bottomSheetRef, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
        this.filterOptions = [
            {
                name: 'default',
                icon: 'filter_b_and_w',
                action: (/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.filterSelected.emit(filter);
                }),
                text: 'B&W'
            },
            {
                name: 'bw2',
                icon: 'filter_b_and_w',
                action: (/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.filterSelected.emit(filter);
                }),
                text: 'B&W 2'
            },
            {
                name: 'bw3',
                icon: 'blur_on',
                action: (/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.filterSelected.emit(filter);
                }),
                text: 'B&W 3'
            },
            {
                name: 'magic_color',
                icon: 'filter_vintage',
                action: (/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.filterSelected.emit(filter);
                }),
                text: 'Magic Color'
            },
            {
                name: 'original',
                icon: 'crop_original',
                action: (/**
                 * @param {?} filter
                 * @return {?}
                 */
                (filter) => {
                    this.filterSelected.emit(filter);
                }),
                text: 'Original'
            },
        ];
        this.filterSelected = new EventEmitter();
    }
    /**
     * @param {?} optionName
     * @return {?}
     */
    selectOption(optionName) {
        this.data.filter = optionName;
        this.bottomSheetRef.dismiss();
    }
}
NgxFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-filter-menu',
                template: "<mat-action-list>\n  <button mat-list-item *ngFor=\"let option of filterOptions\" (click)=\"selectOption(option.name)\">\n    <mat-icon>{{option.icon}}</mat-icon>\n    <span fxFlex=\"100\" style=\"text-align: start; margin: 5px\">{{option.text}}</span>\n    <span fxFlex=\"100\"></span>\n    <mat-icon *ngIf=\"option.name === data.filter\">done</mat-icon>\n  </button>\n</mat-action-list>\n"
            }] }
];
/** @nocollapse */
NgxFilterMenuComponent.ctorParameters = () => [
    { type: MatBottomSheetRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] }
];
NgxFilterMenuComponent.propDecorators = {
    filterSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgxFilterMenuComponent.prototype.filterOptions;
    /** @type {?} */
    NgxFilterMenuComponent.prototype.filterSelected;
    /**
     * @type {?}
     * @private
     */
    NgxFilterMenuComponent.prototype.bottomSheetRef;
    /** @type {?} */
    NgxFilterMenuComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFNeEYsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFpRGpDLFlBQW9CLGNBQXlELEVBQzNCLElBQVM7UUFEdkMsbUJBQWMsR0FBZCxjQUFjLENBQTJDO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQUs7UUFqRDNELGtCQUFhLEdBQThCO1lBQ3pDO2dCQUNFLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU07Ozs7Z0JBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQTtnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNaO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTTs7OztnQkFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFBO2dCQUNELElBQUksRUFBRSxPQUFPO2FBQ2Q7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNOzs7O2dCQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUE7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNOzs7O2dCQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUE7Z0JBQ0QsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU07Ozs7Z0JBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQTtnQkFDRCxJQUFJLEVBQUUsVUFBVTthQUNqQjtTQUNGLENBQUM7UUFDUSxtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUXJELENBQUM7Ozs7O0lBUGhCLFlBQVksQ0FBQyxVQUFVO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isa1pBQStDO2FBQ2hEOzs7O1lBTDhCLGlCQUFpQjs0Q0F3RGpDLE1BQU0sU0FBQyxxQkFBcUI7Ozs2QkFQeEMsTUFBTTs7OztJQTFDUCwrQ0F5Q0U7O0lBQ0YsZ0RBQW9FOzs7OztJQU14RCxnREFBaUU7O0lBQ2pFLHNDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RWRpdG9yQWN0aW9uQnV0dG9ufSBmcm9tICcuLi8uLi9Qcml2YXRlTW9kZWxzJztcbmltcG9ydCB7TUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldFJlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWZpbHRlci1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1maWx0ZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbHRlck1lbnVDb21wb25lbnQge1xuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxFZGl0b3JBY3Rpb25CdXR0b24+ID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdkZWZhdWx0JyxcbiAgICAgIGljb246ICdmaWx0ZXJfYl9hbmRfdycsXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XG4gICAgICB9LFxuICAgICAgdGV4dDogJ0ImVydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdidzInLFxuICAgICAgaWNvbjogJ2ZpbHRlcl9iX2FuZF93JyxcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnQiZXIDInXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYnczJyxcbiAgICAgIGljb246ICdibHVyX29uJyxcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnQiZXIDMnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbWFnaWNfY29sb3InLFxuICAgICAgaWNvbjogJ2ZpbHRlcl92aW50YWdlJyxcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnTWFnaWMgQ29sb3InXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnb3JpZ2luYWwnLFxuICAgICAgaWNvbjogJ2Nyb3Bfb3JpZ2luYWwnLFxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xuICAgICAgfSxcbiAgICAgIHRleHQ6ICdPcmlnaW5hbCdcbiAgICB9LFxuICBdO1xuICBAT3V0cHV0KCkgZmlsdGVyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBzZWxlY3RPcHRpb24ob3B0aW9uTmFtZSkge1xuICAgIHRoaXMuZGF0YS5maWx0ZXIgPSBvcHRpb25OYW1lO1xuICAgIHRoaXMuYm90dG9tU2hlZXRSZWYuZGlzbWlzcygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBib3R0b21TaGVldFJlZjogTWF0Qm90dG9tU2hlZXRSZWY8Tmd4RmlsdGVyTWVudUNvbXBvbmVudD4sXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTogYW55XG4gICAgICAgICAgICAgICkge31cblxufVxuIl19