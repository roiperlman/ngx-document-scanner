/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxOpenCVService, OpenCvConfigToken } from './services/ngx-opencv.service';
import { NgxDraggablePointComponent } from './components/draggable-point/ngx-draggable-point.component';
import { NgxFilterMenuComponent } from './components/filter-menu/ngx-filter-menu.component';
import { NgxShapeOutlineComponent } from './components/shape-outline/ngx-shape-outline.component';
import { NgxDocScannerComponent } from './components/image-editor/ngx-doc-scanner.component';
import { LimitsService } from './services/limits.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
var NgxDocumentScannerModule = /** @class */ (function () {
    function NgxDocumentScannerModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgxDocumentScannerModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgxDocumentScannerModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    };
    NgxDocumentScannerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        NgxDraggablePointComponent,
                        NgxFilterMenuComponent,
                        NgxShapeOutlineComponent,
                        NgxDocScannerComponent,
                    ],
                    imports: [
                        FlexLayoutModule,
                        MatButtonModule,
                        MatIconModule,
                        MatBottomSheetModule,
                        MatListModule,
                        AngularDraggableModule,
                        CommonModule,
                    ],
                    exports: [
                        NgxDocScannerComponent,
                    ],
                    entryComponents: [
                        NgxFilterMenuComponent,
                    ],
                    providers: [
                        NgxOpenCVService,
                        LimitsService,
                    ]
                },] }
    ];
    return NgxDocumentScannerModule;
}());
export { NgxDocumentScannerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDO0lBQUE7SUFrQ0EsQ0FBQzs7Ozs7SUFOUSxnQ0FBTzs7OztJQUFkLFVBQWUsTUFBb0I7UUFDakMsT0FBTztZQUNMLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzlELENBQUM7SUFDSixDQUFDOztnQkFqQ0YsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixvQkFBb0I7d0JBQ3BCLGFBQWE7d0JBQ2Isc0JBQXNCO3dCQUN0QixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7cUJBQ3ZCO29CQUNELGVBQWUsRUFBRTt3QkFDZixzQkFBc0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2Q7aUJBQ0Y7O0lBUUQsK0JBQUM7Q0FBQSxBQWxDRCxJQWtDQztTQVBZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05neE9wZW5DVlNlcnZpY2UsIE9wZW5DdkNvbmZpZ1Rva2VufSBmcm9tICcuL3NlcnZpY2VzL25neC1vcGVuY3Yuc2VydmljZSc7XHJcbmltcG9ydCB7Tmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9kcmFnZ2FibGUtcG9pbnQvbmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neEZpbHRlck1lbnVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9maWx0ZXItbWVudS9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hTaGFwZU91dGxpbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd4RG9jU2Nhbm5lckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ltYWdlLWVkaXRvci9uZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcclxuaW1wb3J0IHtGbGV4TGF5b3V0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XHJcbmltcG9ydCB7TWF0Qm90dG9tU2hlZXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQge0FuZ3VsYXJEcmFnZ2FibGVNb2R1bGV9IGZyb20gJ2FuZ3VsYXIyLWRyYWdnYWJsZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge09wZW5DVkNvbmZpZ30gZnJvbSAnLi9QdWJsaWNNb2RlbHMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5neERyYWdnYWJsZVBvaW50Q29tcG9uZW50LFxyXG4gICAgTmd4RmlsdGVyTWVudUNvbXBvbmVudCxcclxuICAgIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCxcclxuICAgIE5neERvY1NjYW5uZXJDb21wb25lbnQsXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIEFuZ3VsYXJEcmFnZ2FibGVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ3hEb2NTY2FubmVyQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOZ3hPcGVuQ1ZTZXJ2aWNlLFxyXG4gICAgTGltaXRzU2VydmljZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogT3BlbkNWQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4RG9jdW1lbnRTY2FubmVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE9wZW5DdkNvbmZpZ1Rva2VuLCB1c2VWYWx1ZTogY29uZmlnIH1dXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=