/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
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
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'B&W'
            },
            {
                name: 'bw2',
                icon: 'filter_b_and_w',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'B&W 2'
            },
            {
                name: 'bw3',
                icon: 'blur_on',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'B&W 3'
            },
            {
                name: 'magic_color',
                icon: 'filter_vintage',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
                text: 'Magic Color'
            },
            {
                name: 'original',
                icon: 'crop_original',
                action: (filter) => {
                    this.filterSelected.emit(filter);
                },
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
                template: "<mat-action-list>\r\n  <button mat-list-item *ngFor=\"let option of filterOptions\" (click)=\"selectOption(option.name)\">\r\n    <mat-icon>{{option.icon}}</mat-icon>\r\n    <span fxFlex=\"100\" style=\"text-align: start; margin: 5px\">{{option.text}}</span>\r\n    <span fxFlex=\"100\"></span>\r\n    <mat-icon *ngIf=\"option.name === data.filter\">done</mat-icon>\r\n  </button>\r\n</mat-action-list>\r\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUMscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQU0zRSxNQUFNLE9BQU8sc0JBQXNCOzs7OztJQWlEakMsWUFBb0IsY0FBeUQsRUFDM0IsSUFBUztRQUR2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBMkM7UUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQWpEM0Qsa0JBQWEsR0FBOEI7WUFDekM7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxLQUFLO2FBQ1o7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLE9BQU87YUFDZDtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsYUFBYTthQUNwQjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVO2FBQ2pCO1NBQ0YsQ0FBQztRQUNRLG1CQUFjLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFRckQsQ0FBQzs7Ozs7SUFQaEIsWUFBWSxDQUFDLFVBQVU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixrYUFBK0M7YUFDaEQ7Ozs7WUFMOEIsaUJBQWlCOzRDQXdEakMsTUFBTSxTQUFDLHFCQUFxQjs7OzZCQVB4QyxNQUFNOzs7O0lBMUNQLCtDQXlDRTs7SUFDRixnREFBb0U7Ozs7O0lBTXhELGdEQUFpRTs7SUFDakUsc0NBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFZGl0b3JBY3Rpb25CdXR0b259IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuaW1wb3J0IHtNQVRfQk9UVE9NX1NIRUVUX0RBVEEsIE1hdEJvdHRvbVNoZWV0UmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1maWx0ZXItbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50IHtcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8RWRpdG9yQWN0aW9uQnV0dG9uPiA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICBpY29uOiAnZmlsdGVyX2JfYW5kX3cnLFxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xuICAgICAgfSxcbiAgICAgIHRleHQ6ICdCJlcnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYncyJyxcbiAgICAgIGljb246ICdmaWx0ZXJfYl9hbmRfdycsXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XG4gICAgICB9LFxuICAgICAgdGV4dDogJ0ImVyAyJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2J3MycsXG4gICAgICBpY29uOiAnYmx1cl9vbicsXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XG4gICAgICB9LFxuICAgICAgdGV4dDogJ0ImVyAzJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ21hZ2ljX2NvbG9yJyxcbiAgICAgIGljb246ICdmaWx0ZXJfdmludGFnZScsXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XG4gICAgICB9LFxuICAgICAgdGV4dDogJ01hZ2ljIENvbG9yJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ29yaWdpbmFsJyxcbiAgICAgIGljb246ICdjcm9wX29yaWdpbmFsJyxcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnT3JpZ2luYWwnXG4gICAgfSxcbiAgXTtcbiAgQE91dHB1dCgpIGZpbHRlclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgc2VsZWN0T3B0aW9uKG9wdGlvbk5hbWUpIHtcbiAgICB0aGlzLmRhdGEuZmlsdGVyID0gb3B0aW9uTmFtZTtcbiAgICB0aGlzLmJvdHRvbVNoZWV0UmVmLmRpc21pc3MoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPE5neEZpbHRlck1lbnVDb21wb25lbnQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9CT1RUT01fU0hFRVRfREFUQSkgcHVibGljIGRhdGE6IGFueVxuICAgICAgICAgICAgICApIHt9XG5cbn1cbiJdfQ==