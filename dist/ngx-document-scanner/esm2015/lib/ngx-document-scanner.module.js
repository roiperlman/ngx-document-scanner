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
export class NgxDocumentScannerModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxDocumentScannerModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBOEI3QyxNQUFNLE9BQU8sd0JBQXdCOzs7OztJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQW9CO1FBQ2pDLE9BQU87WUFDTCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUM5RCxDQUFDO0lBQ0osQ0FBQzs7O1lBakNGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osMEJBQTBCO29CQUMxQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO2lCQUN2QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNkO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3hPcGVuQ1ZTZXJ2aWNlLCBPcGVuQ3ZDb25maWdUb2tlbn0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtb3BlbmN2LnNlcnZpY2UnO1xyXG5pbXBvcnQge05neERyYWdnYWJsZVBvaW50Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZHJhZ2dhYmxlLXBvaW50L25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hGaWx0ZXJNZW51Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcGUtb3V0bGluZS9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neERvY1NjYW5uZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9pbWFnZS1lZGl0b3Ivbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TGltaXRzU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XHJcbmltcG9ydCB7RmxleExheW91dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xyXG5pbXBvcnQge01hdEJvdHRvbVNoZWV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHtBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlfSBmcm9tICdhbmd1bGFyMi1kcmFnZ2FibGUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtPcGVuQ1ZDb25maWd9IGZyb20gJy4vUHVibGljTW9kZWxzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudCxcclxuICAgIE5neEZpbHRlck1lbnVDb21wb25lbnQsXHJcbiAgICBOZ3hTaGFwZU91dGxpbmVDb21wb25lbnQsXHJcbiAgICBOZ3hEb2NTY2FubmVyQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgRmxleExheW91dE1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgTmd4RmlsdGVyTWVudUNvbXBvbmVudCxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmd4T3BlbkNWU2VydmljZSxcclxuICAgIExpbWl0c1NlcnZpY2UsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RG9jdW1lbnRTY2FubmVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IE9wZW5DVkNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neERvY3VtZW50U2Nhbm5lck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBPcGVuQ3ZDb25maWdUb2tlbiwgdXNlVmFsdWU6IGNvbmZpZyB9XVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19