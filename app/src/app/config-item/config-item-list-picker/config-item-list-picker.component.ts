import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  title: string;
  action: string;
}


@Component({
  selector: 'app-config-item-list-picker',
  templateUrl: './config-item-list-picker.component.html',
  styleUrls: ['./config-item-list-picker.component.scss']
})
export class ConfigItemListPickerComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
