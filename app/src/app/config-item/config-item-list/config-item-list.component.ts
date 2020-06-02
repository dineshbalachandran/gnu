import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfigItemListDataSource } from '../../shared/datasource/config-item-list-datasource';
import { ConfigItem } from '../../shared/model/config-item.model';
import { ConfigItemListPickerData, ConfigItemListPickerComponent } from '../config-item-list-picker/config-item-list-picker.component';

interface itemData {
  packedItems: ConfigItem[];
  unpackedItems: ConfigItem[];
}

@Component({
  selector: 'app-config-item-list',
  templateUrl: './config-item-list.component.html',
  styleUrls: ['./config-item-list.component.scss']
})
export class ConfigItemListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ConfigItem>;
  dataSource: ConfigItemListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['entity', 'entityKey', 'version', 'change'];
  
  @Input() items: itemData;
  @Output() itemsUpdated = new EventEmitter<itemData>();

  updatedItems: itemData;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {    
    this.dataSource = new ConfigItemListDataSource(this.itemsUpdated);
    this.updatedItems = {packedItems: [...this.items.packedItems], 
                         unpackedItems: [...this.items.unpackedItems]};
    this.itemsUpdated.emit(this.updatedItems);        
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAdd() {
    const data: ConfigItemListPickerData = {
      title: 'Add items',
      action: 'Add',
      items: this.updatedItems.unpackedItems
    }

    let dialogRef = this.openSelectItemsDialog(data);
    dialogRef.afterClosed().subscribe(selectedItems => {
      if (!selectedItems)
        return;
      [this.updatedItems.unpackedItems, this.updatedItems.packedItems] =
            this.exchangeItems(new Set(selectedItems.map((item, index) => item.value)), 
                          this.updatedItems.unpackedItems, 
                          this.updatedItems.packedItems);
      this.itemsUpdated.emit(this.updatedItems);
    });    
  }

  onRemove() {
    const data: ConfigItemListPickerData = {
      title: 'Remove items',
      action: 'Remove',
      items: this.updatedItems.packedItems
    }
    
    let dialogRef = this.openSelectItemsDialog(data);
    dialogRef.afterClosed().subscribe(selectedItems => {
      if (!selectedItems)
        return;
      [this.updatedItems.packedItems, this.updatedItems.unpackedItems] = 
            this.exchangeItems(new Set(selectedItems.map((i, _) => i.value)), 
                        this.updatedItems.packedItems, 
                        this.updatedItems.unpackedItems);
      this.itemsUpdated.emit(this.updatedItems);
    });
  }

  private exchangeItems(ciIDs: Set<number>, from: ConfigItem[], to: ConfigItem[]) {
    
    let move = from.filter((ci, index) => ciIDs.has(ci.id));
    let updatedTo = to.concat(...move);
    let updatedFrom = from.filter((ci, index) => !ciIDs.has(ci.id))
    
    return [updatedFrom, updatedTo];
  }

  private openSelectItemsDialog(data: ConfigItemListPickerData) {
    return this.dialog.open(ConfigItemListPickerComponent, {data});
  }
  
}
