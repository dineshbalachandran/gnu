import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { trigger, sequence, animate, transition, style } from '@angular/animations';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { PackageListDataSource} from '../../../shared/datasource/package-list-datasource';
import { Package, PackageStatus } from '../../../shared/model/package.model';
import * as fromApp from '../../../store/app.reducer';
import { PackageCreateComponent } from '../package-create/package-create.component';
import * as PackageActions from '../store/package.actions';
import { environment } from '../../../../environments/environment';

const rowsAnimation =
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]);

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
  animations: [rowsAnimation]
})
export class PackageListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Package>;
  dataSource: PackageListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['no', 'description', 'createdOn', 'createdBy',
      'committedOn', 'committedBy', 'source', 'status'];

  constructor(private store: Store<fromApp.State>, private dialog: MatDialog) {}

  ngOnInit() {

    this.dataSource = new PackageListDataSource(
      this.store.select('package').pipe(map(packageState => packageState.packages))
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate() {
    let dialogRef = this.dialog.open(PackageCreateComponent);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (!result)
          return;
        this.store.dispatch(
          PackageActions.saveNewPackage(
            {package: new Package(
                -1, result.no, result.description, new Date(), 'Test',
                null, '', environment.env, PackageStatus.OPEN)
            }
          )
        );
      });
  }
}
