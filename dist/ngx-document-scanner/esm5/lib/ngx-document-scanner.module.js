/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxOpenCvService, OpenCvConfigToken } from './services/ngx-open-cv.service';
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
                        NgxOpenCvService,
                        LimitsService,
                    ]
                },] }
    ];
    return NgxDocumentScannerModule;
}());
export { NgxDocumentScannerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDO0lBQUE7SUFrQ0EsQ0FBQzs7Ozs7SUFOUSxnQ0FBTzs7OztJQUFkLFVBQWUsTUFBb0I7UUFDakMsT0FBTztZQUNMLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzlELENBQUM7SUFDSixDQUFDOztnQkFqQ0YsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4QixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixvQkFBb0I7d0JBQ3BCLGFBQWE7d0JBQ2Isc0JBQXNCO3dCQUN0QixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7cUJBQ3ZCO29CQUNELGVBQWUsRUFBRTt3QkFDZixzQkFBc0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2Q7aUJBQ0Y7O0lBUUQsK0JBQUM7Q0FBQSxBQWxDRCxJQWtDQztTQVBZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hPcGVuQ3ZTZXJ2aWNlLCBPcGVuQ3ZDb25maWdUb2tlbn0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtb3Blbi1jdi5zZXJ2aWNlJztcbmltcG9ydCB7Tmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9kcmFnZ2FibGUtcG9pbnQvbmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ3hGaWx0ZXJNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge05neFNoYXBlT3V0bGluZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXBlLW91dGxpbmUvbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4RG9jU2Nhbm5lckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ltYWdlLWVkaXRvci9uZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7TGltaXRzU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XG5pbXBvcnQge0ZsZXhMYXlvdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7TWF0Qm90dG9tU2hlZXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlfSBmcm9tICdhbmd1bGFyMi1kcmFnZ2FibGUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge09wZW5DdkNvbmZpZ30gZnJvbSAnLi9QdWJsaWNNb2RlbHMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudCxcbiAgICBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LFxuICAgIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCxcbiAgICBOZ3hEb2NTY2FubmVyQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIEFuZ3VsYXJEcmFnZ2FibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTmd4RmlsdGVyTWVudUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmd4T3BlbkN2U2VydmljZSxcbiAgICBMaW1pdHNTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERvY3VtZW50U2Nhbm5lck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogT3BlbkN2Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE9wZW5DdkNvbmZpZ1Rva2VuLCB1c2VWYWx1ZTogY29uZmlnIH1dXG4gICAgfTtcbiAgfVxufVxuIl19