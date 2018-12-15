/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
var NgxFilterMenuComponent = /** @class */ (function () {
    function NgxFilterMenuComponent(bottomSheetRef, data) {
        var _this = this;
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
        this.filterOptions = [
            {
                name: 'default',
                icon: 'filter_b_and_w',
                action: function (filter) {
                    _this.filterSelected.emit(filter);
                },
                text: 'B&W'
            },
            {
                name: 'bw2',
                icon: 'filter_b_and_w',
                action: function (filter) {
                    _this.filterSelected.emit(filter);
                },
                text: 'B&W 2'
            },
            {
                name: 'bw3',
                icon: 'blur_on',
                action: function (filter) {
                    _this.filterSelected.emit(filter);
                },
                text: 'B&W 3'
            },
            {
                name: 'magic_color',
                icon: 'filter_vintage',
                action: function (filter) {
                    _this.filterSelected.emit(filter);
                },
                text: 'Magic Color'
            },
            {
                name: 'original',
                icon: 'crop_original',
                action: function (filter) {
                    _this.filterSelected.emit(filter);
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
    NgxFilterMenuComponent.prototype.selectOption = /**
     * @param {?} optionName
     * @return {?}
     */
    function (optionName) {
        this.data.filter = optionName;
        this.bottomSheetRef.dismiss();
    };
    NgxFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-filter-menu',
                    template: "<mat-action-list>\r\n  <button mat-list-item *ngFor=\"let option of filterOptions\" (click)=\"selectOption(option.name)\">\r\n    <mat-icon>{{option.icon}}</mat-icon>\r\n    <span fxFlex=\"100\" style=\"text-align: start; margin: 5px\">{{option.text}}</span>\r\n    <span fxFlex=\"100\"></span>\r\n    <mat-icon *ngIf=\"option.name === data.filter\">done</mat-icon>\r\n  </button>\r\n</mat-action-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    NgxFilterMenuComponent.ctorParameters = function () { return [
        { type: MatBottomSheetRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] }
    ]; };
    NgxFilterMenuComponent.propDecorators = {
        filterSelected: [{ type: Output }]
    };
    return NgxFilterMenuComponent;
}());
export { NgxFilterMenuComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUMscUJBQXFCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUzRTtJQXFERSxnQ0FBb0IsY0FBeUQsRUFDM0IsSUFBUztRQUQzRCxpQkFFZ0I7UUFGSSxtQkFBYyxHQUFkLGNBQWMsQ0FBMkM7UUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQWpEM0Qsa0JBQWEsR0FBOEI7WUFDekM7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLFVBQUMsTUFBTTtvQkFDYixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsS0FBSzthQUNaO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLFVBQUMsTUFBTTtvQkFDYixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLFVBQUMsTUFBTTtvQkFDYixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRSxVQUFDLE1BQU07b0JBQ2IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLGFBQWE7YUFDcEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxVQUFDLE1BQU07b0JBQ2IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLFVBQVU7YUFDakI7U0FDRixDQUFDO1FBQ1EsbUJBQWMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVFyRCxDQUFDOzs7OztJQVBoQiw2Q0FBWTs7OztJQUFaLFVBQWEsVUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDOztnQkFuREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGthQUErQztpQkFDaEQ7Ozs7Z0JBTDhCLGlCQUFpQjtnREF3RGpDLE1BQU0sU0FBQyxxQkFBcUI7OztpQ0FQeEMsTUFBTTs7SUFVVCw2QkFBQztDQUFBLEFBekRELElBeURDO1NBckRZLHNCQUFzQjs7O0lBQ2pDLCtDQXlDRTs7SUFDRixnREFBb0U7Ozs7O0lBTXhELGdEQUFpRTs7SUFDakUsc0NBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0VkaXRvckFjdGlvbkJ1dHRvbn0gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XHJcbmltcG9ydCB7TUFUX0JPVFRPTV9TSEVFVF9EQVRBLCBNYXRCb3R0b21TaGVldFJlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtZmlsdGVyLW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsdGVyTWVudUNvbXBvbmVudCB7XHJcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8RWRpdG9yQWN0aW9uQnV0dG9uPiA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2RlZmF1bHQnLFxyXG4gICAgICBpY29uOiAnZmlsdGVyX2JfYW5kX3cnLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ0ImVydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdidzInLFxyXG4gICAgICBpY29uOiAnZmlsdGVyX2JfYW5kX3cnLFxyXG4gICAgICBhY3Rpb246IChmaWx0ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlbGVjdGVkLmVtaXQoZmlsdGVyKTtcclxuICAgICAgfSxcclxuICAgICAgdGV4dDogJ0ImVyAyJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2J3MycsXHJcbiAgICAgIGljb246ICdibHVyX29uJyxcclxuICAgICAgYWN0aW9uOiAoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZC5lbWl0KGZpbHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHQ6ICdCJlcgMydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdtYWdpY19jb2xvcicsXHJcbiAgICAgIGljb246ICdmaWx0ZXJfdmludGFnZScsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnTWFnaWMgQ29sb3InXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnb3JpZ2luYWwnLFxyXG4gICAgICBpY29uOiAnY3JvcF9vcmlnaW5hbCcsXHJcbiAgICAgIGFjdGlvbjogKGZpbHRlcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQuZW1pdChmaWx0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiAnT3JpZ2luYWwnXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgQE91dHB1dCgpIGZpbHRlclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBzZWxlY3RPcHRpb24ob3B0aW9uTmFtZSkge1xyXG4gICAgdGhpcy5kYXRhLmZpbHRlciA9IG9wdGlvbk5hbWU7XHJcbiAgICB0aGlzLmJvdHRvbVNoZWV0UmVmLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPE5neEZpbHRlck1lbnVDb21wb25lbnQ+LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX0JPVFRPTV9TSEVFVF9EQVRBKSBwdWJsaWMgZGF0YTogYW55XHJcbiAgICAgICAgICAgICAgKSB7fVxyXG5cclxufVxyXG4iXX0=