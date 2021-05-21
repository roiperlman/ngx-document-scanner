import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {EditorActionButton} from '../../PrivateModels';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'ngx-filter-menu',
  templateUrl: './ngx-filter-menu.component.html',
})
export class NgxFilterMenuComponent {
  filterOptions: Array<EditorActionButton> = [
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
  @Output() filterSelected: EventEmitter<string> = new EventEmitter();
  selectOption(optionName) {
    this.data.filter = optionName;
    this.bottomSheetRef.dismiss();
  }

  constructor(private bottomSheetRef: MatBottomSheetRef<NgxFilterMenuComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
              ) {}

}
