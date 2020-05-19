import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageRoutingModule } from './package-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [
          PackageListComponent   
    ],
    imports: [PackageRoutingModule, SharedModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class PackageModule {}