/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-document-scanner.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxDraggablePointComponent } from './components/draggable-point/ngx-draggable-point.component';
import { NgxFilterMenuComponent } from './components/filter-menu/ngx-filter-menu.component';
import { NgxShapeOutlineComponent } from './components/shape-outline/ngx-shape-outline.component';
import { NgxDocScannerComponent } from './components/image-editor/ngx-doc-scanner.component';
import { LimitsService } from './services/limits.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularDraggableModule } from 'angular2-draggable';
import { CommonModule } from '@angular/common';
import { NgxOpenCVModule } from 'ngx-opencv';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { NgxOpenCVService, OpenCvConfigToken } from 'ngx-opencv';
export class NgxDocumentScannerModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxDocumentScannerModule,
            providers: [
                { provide: OpenCvConfigToken, useValue: config },
            ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LWRvY3VtZW50LXNjYW5uZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDMUYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDaEcsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDM0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFlBQVksQ0FBQztBQW9DL0QsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7SUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUNqQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUNqRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUExQ0YsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWiwwQkFBMEI7b0JBQzFCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4QixzQkFBc0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2Isc0JBQXNCO29CQUN0QixZQUFZO29CQUNaLGVBQWU7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixvQkFBb0I7b0JBQ3BCLGFBQWE7b0JBQ2Isc0JBQXNCO29CQUN0QixzQkFBc0I7aUJBQ3ZCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixzQkFBc0I7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxnQkFBZ0I7b0JBQ2hCLGFBQWE7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudCc7XG5pbXBvcnQge05neEZpbHRlck1lbnVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9maWx0ZXItbWVudS9uZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc2hhcGUtb3V0bGluZS9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ3hEb2NTY2FubmVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvaW1hZ2UtZWRpdG9yL25neC1kb2Mtc2Nhbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcbmltcG9ydCB7RmxleExheW91dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHtBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlfSBmcm9tICdhbmd1bGFyMi1kcmFnZ2FibGUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge09wZW5DVkNvbmZpZ30gZnJvbSAnLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHtOZ3hPcGVuQ1ZNb2R1bGV9IGZyb20gJ25neC1vcGVuY3YnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7Tmd4T3BlbkNWU2VydmljZSwgT3BlbkN2Q29uZmlnVG9rZW59IGZyb20gJ25neC1vcGVuY3YnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudCxcbiAgICBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50LFxuICAgIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCxcbiAgICBOZ3hEb2NTY2FubmVyQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIEFuZ3VsYXJEcmFnZ2FibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE5neE9wZW5DVk1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBBbmd1bGFyRHJhZ2dhYmxlTW9kdWxlLFxuICAgIE5neERvY1NjYW5uZXJDb21wb25lbnQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIE5neEZpbHRlck1lbnVDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE5neE9wZW5DVlNlcnZpY2UsXG4gICAgTGltaXRzU2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEb2N1bWVudFNjYW5uZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IE9wZW5DVkNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RG9jdW1lbnRTY2FubmVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogT3BlbkN2Q29uZmlnVG9rZW4sIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19