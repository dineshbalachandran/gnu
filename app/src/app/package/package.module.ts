import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageRoutingModule } from './package-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { PackageComponent } from './package/package.component';

@NgModule({
    declarations: [
          PackageListComponent,
          PackageComponent   
    ],
    imports: [
        PackageRoutingModule, 
        SharedModule, 
        MatTabsModule, 
        MatTableModule, 
        MatPaginatorModule, 
        MatSortModule
    ]
})
export class PackageModule {}