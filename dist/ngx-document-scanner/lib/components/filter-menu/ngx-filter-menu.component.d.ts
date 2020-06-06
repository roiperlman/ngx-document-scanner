import { EventEmitter } from '@angular/core';
import { EditorActionButton } from '../../PrivateModels';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as ɵngcc0 from '@angular/core';
export declare class NgxFilterMenuComponent {
    private bottomSheetRef;
    data: any;
    filterOptions: Array<EditorActionButton>;
    filterSelected: EventEmitter<string>;
    selectOption(optionName: any): void;
    constructor(bottomSheetRef: MatBottomSheetRef<NgxFilterMenuComponent>, data: any);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxFilterMenuComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxFilterMenuComponent, "ngx-filter-menu", never, {}, { "filterSelected": "filterSelected"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci1tZW51LmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZ3gtZmlsdGVyLW1lbnUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWRpdG9yQWN0aW9uQnV0dG9uIH0gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XG5pbXBvcnQgeyBNYXRCb3R0b21TaGVldFJlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2JvdHRvbS1zaGVldCc7XG5leHBvcnQgZGVjbGFyZSBjbGFzcyBOZ3hGaWx0ZXJNZW51Q29tcG9uZW50IHtcbiAgICBwcml2YXRlIGJvdHRvbVNoZWV0UmVmO1xuICAgIGRhdGE6IGFueTtcbiAgICBmaWx0ZXJPcHRpb25zOiBBcnJheTxFZGl0b3JBY3Rpb25CdXR0b24+O1xuICAgIGZpbHRlclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPjtcbiAgICBzZWxlY3RPcHRpb24ob3B0aW9uTmFtZTogYW55KTogdm9pZDtcbiAgICBjb25zdHJ1Y3Rvcihib3R0b21TaGVldFJlZjogTWF0Qm90dG9tU2hlZXRSZWY8Tmd4RmlsdGVyTWVudUNvbXBvbmVudD4sIGRhdGE6IGFueSk7XG59XG4iXX0=