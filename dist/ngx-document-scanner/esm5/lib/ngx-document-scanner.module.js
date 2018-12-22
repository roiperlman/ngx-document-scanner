/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxDraggablePointComponent } from './components/draggable-point/ngx-draggable-point.component';
import { NgxFilterMenuComponent } from './components/filter-menu/ngx-filter-menu.component';
import { NgxShapeOutlineComponent } from './components/shape-outline/ngx-shape-outline.component';
import { NgxDocScannerComponent } from './components/image-editor/ngx-doc-scanner.component';
import { LimitsService } from './services/limits.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
import { NgxOpenCVModule } from 'ngx-opencv';
import { NgxOpenCVService, OpenCvConfigToken } from 'ngx-opencv';
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
            providers: [
                { provide: OpenCvConfigToken, useValue: config },
            ],
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
                        NgxOpenCVModule,
                    ],
                    exports: [
                        FlexLayoutModule,
                        MatButtonModule,
                        MatIconModule,
                        MatBottomSheetModule,
                        MatListModule,
                        AngularDraggableModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRS9EO0lBQUE7SUEyQ0EsQ0FBQzs7Ozs7SUFSUSxnQ0FBTzs7OztJQUFkLFVBQWUsTUFBb0I7UUFDakMsT0FBTztZQUNMLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7YUFDakQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBMUNGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3FCQUN2QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixhQUFhO3dCQUNiLHNCQUFzQjt3QkFDdEIsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixhQUFhO3dCQUNiLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3FCQUN2QjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2Ysc0JBQXNCO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsZ0JBQWdCO3dCQUNoQixhQUFhO3FCQUNkO2lCQUNGOztJQVVELCtCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0FUWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd4RmlsdGVyTWVudUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbHRlci1tZW51L25neC1maWx0ZXItbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neFNoYXBlT3V0bGluZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3NoYXBlLW91dGxpbmUvbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hEb2NTY2FubmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvaW1hZ2UtZWRpdG9yL25neC1kb2Mtc2Nhbm5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xpbWl0c1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xyXG5pbXBvcnQge0ZsZXhMYXlvdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcclxuaW1wb3J0IHtNYXRCb3R0b21TaGVldE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7QW5ndWxhckRyYWdnYWJsZU1vZHVsZX0gZnJvbSAnYW5ndWxhcjItZHJhZ2dhYmxlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7T3BlbkNWQ29uZmlnfSBmcm9tICcuL1B1YmxpY01vZGVscyc7XHJcbmltcG9ydCB7Tmd4T3BlbkNWTW9kdWxlfSBmcm9tICduZ3gtb3BlbmN2JztcclxuaW1wb3J0IHtOZ3hPcGVuQ1ZTZXJ2aWNlLCBPcGVuQ3ZDb25maWdUb2tlbn0gZnJvbSAnbmd4LW9wZW5jdic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnQsXHJcbiAgICBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LFxyXG4gICAgTmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50LFxyXG4gICAgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCxcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgQW5ndWxhckRyYWdnYWJsZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5neE9wZW5DVk1vZHVsZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgQW5ndWxhckRyYWdnYWJsZU1vZHVsZSxcclxuICAgIE5neERvY1NjYW5uZXJDb21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIE5neEZpbHRlck1lbnVDb21wb25lbnQsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5neE9wZW5DVlNlcnZpY2UsXHJcbiAgICBMaW1pdHNTZXJ2aWNlLFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERvY3VtZW50U2Nhbm5lck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBPcGVuQ1ZDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogT3BlbkN2Q29uZmlnVG9rZW4sIHVzZVZhbHVlOiBjb25maWcgfSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==