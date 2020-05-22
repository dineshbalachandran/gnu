import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { PackageListComponent } from './package-list/package-list.component';
import { PackageComponent } from '../package.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PackageMigrateComponent } from './migrate/package-migrate.component';

const routes: Routes = [
    {
        path: '', component: PackageComponent, //implementing lazy loading
        children: [
            {path: '', component: PackageListComponent},
            {path: 'migrate', component: PackageMigrateComponent},
            {path: ':no', component: PackageDetailsComponent}                       
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageRoutingModule {}