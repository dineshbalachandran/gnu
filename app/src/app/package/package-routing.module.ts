import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { PackageListComponent } from './package-list/package-list.component';
import { PackageComponent } from './package/package.component';

const routes: Routes = [
    {
        path: '', component: PackageComponent, //implementing lazy loading
        children: [
            {path: '', component: PackageListComponent}            
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageRoutingModule {}