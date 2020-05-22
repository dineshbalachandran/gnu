import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { PackageListComponent } from './package/package-list/package-list.component';
import { ReleaseComponent } from './release.component';
import { PackageDetailsComponent } from './package/package-details/package-details.component';
import { MigrateComponent } from './migrate/migrate.component';

const routes: Routes = [
    {
        path: '', component: ReleaseComponent, //implementing lazy loading
        children: [
            {path: '',  redirectTo: 'package', pathMatch: 'full'},
            {path: 'package', component: PackageListComponent},
            {path: 'migrate', component: MigrateComponent},
            {path: 'package/:no', component: PackageDetailsComponent}                       
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReleaseRoutingModule {}