import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ConfigItemListDataSource } from './config-item-list-datasource';
import { ConfigItem } from '../config-item.model';

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

  ngOnInit() {
    this.dataSource = new ConfigItemListDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
