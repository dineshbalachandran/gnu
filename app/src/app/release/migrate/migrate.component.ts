import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Package } from '../../shared/model/package.model';
import { PackageListDataSource } from '../../shared/datasource/package-list-datasource';
import { MigrateService } from './migrate.service';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.scss']
})
export class MigrateComponent implements AfterViewInit, OnInit {

  environments = ['SIT', 'PROD'];
  targetEnv = 'SIT';
  exportMessage = '';
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'no', 'description', 'committedOn', 'committedBy'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Package>;
  dataSource: PackageListDataSource;

  selection = new SelectionModel<Package>(true, []);

  constructor(private _formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private migrateService: MigrateService) {}
  
  ngAfterViewInit() {    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.dataSource = new PackageListDataSource(this.migrateService.packagesUpdated);    
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Package): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
  }

  onConnect() {
    this.migrateService.fetchPackagesForExport(this.targetEnv);
  }

  onExport() {
    
    let packages : Package[] = [];
    this.dataSource.data.forEach(_package => {
      if (this.selection.isSelected(_package)) 
        packages.push(_package);
    });
    
    this.migrateService.exportPackages(this.targetEnv, packages).subscribe(exported => {
      this.exportMessage = 'Export initiated for ' + exported.length + 
          ' packages. Please check target environment for progression status.';
    });
  }

  onClose() {
    this.router.navigate(['../package'],{relativeTo: this.route});
  }
}
