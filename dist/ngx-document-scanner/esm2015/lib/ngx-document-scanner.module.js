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
                    NgxOpenCvService,
                    LimitsService,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0REFBNEQsQ0FBQztBQUN0RyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBOEI3QyxNQUFNLE9BQU8sd0JBQXdCOzs7OztJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQW9CO1FBQ2pDLE9BQU87WUFDTCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUM5RCxDQUFDO0lBQ0osQ0FBQzs7O1lBakNGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osMEJBQTBCO29CQUMxQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLHNCQUFzQjtvQkFDdEIsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asc0JBQXNCO2lCQUN2QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysc0JBQXNCO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNkO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4T3BlbkN2U2VydmljZSwgT3BlbkN2Q29uZmlnVG9rZW59IGZyb20gJy4vc2VydmljZXMvbmd4LW9wZW4tY3Yuc2VydmljZSc7XG5pbXBvcnQge05neERyYWdnYWJsZVBvaW50Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZHJhZ2dhYmxlLXBvaW50L25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4RmlsdGVyTWVudUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbHRlci1tZW51L25neC1maWx0ZXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ3hTaGFwZU91dGxpbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQge05neERvY1NjYW5uZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9pbWFnZS1lZGl0b3Ivbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0xpbWl0c1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHtGbGV4TGF5b3V0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQge01hdEJvdHRvbVNoZWV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7QW5ndWxhckRyYWdnYWJsZU1vZHVsZX0gZnJvbSAnYW5ndWxhcjItZHJhZ2dhYmxlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtPcGVuQ3ZDb25maWd9IGZyb20gJy4vUHVibGljTW9kZWxzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnQsXG4gICAgTmd4RmlsdGVyTWVudUNvbXBvbmVudCxcbiAgICBOZ3hTaGFwZU91dGxpbmVDb21wb25lbnQsXG4gICAgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neERvY1NjYW5uZXJDb21wb25lbnQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIE5neEZpbHRlck1lbnVDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE5neE9wZW5DdlNlcnZpY2UsXG4gICAgTGltaXRzU2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IE9wZW5DdkNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RG9jdW1lbnRTY2FubmVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBPcGVuQ3ZDb25maWdUb2tlbiwgdXNlVmFsdWU6IGNvbmZpZyB9XVxuICAgIH07XG4gIH1cbn1cbiJdfQ==