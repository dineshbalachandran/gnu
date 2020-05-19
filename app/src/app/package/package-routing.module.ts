import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { PackageListComponent } from './package-list/package-list.component';

const routes: Routes = [
    {path: '', component: PackageListComponent, //implementing lazy loading
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageRoutingModule {}