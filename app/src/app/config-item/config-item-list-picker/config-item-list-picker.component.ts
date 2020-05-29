import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigItem } from '../../shared/model/config-item.model';
import { MatSelectionList } from '@angular/material/list';


export interface ConfigItemListPickerData {
  title: string;
  action: string;
  items: ConfigItem[];
}


@Component({
  selector: 'app-config-item-list-picker',
  templateUrl: './config-item-list-picker.component.html',
  styleUrls: ['./config-item-list-picker.component.scss']
})
export class ConfigItemListPickerComponent implements OnInit {

  @ViewChild('listItems') listItems: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<ConfigItemListPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigItemListPickerData) { }

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {       
    this.dialogRef.close(this.listItems.selectedOptions.selected);
  }

}
