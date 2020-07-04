import { EventEmitter } from '@angular/core';
import { EditorActionButton } from '../../PrivateModels';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
export declare class NgxFilterMenuComponent {
    private bottomSheetRef;
    data: any;
    filterOptions: Array<EditorActionButton>;
    filterSelected: EventEmitter<string>;
    selectOption(optionName: any): void;
    constructor(bottomSheetRef: MatBottomSheetRef<NgxFilterMenuComponent>, data: any);
}
