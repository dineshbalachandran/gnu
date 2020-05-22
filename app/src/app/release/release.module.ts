import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ReleaseComponent } from './release.component';
import { PackageListComponent } from './package/package-list/package-list.component';
import { ReleaseRoutingModule } from './release-routing.module';
import { PackageDetailsComponent } from './package/package-details/package-details.component';
import { ConfigItemModule } from '../config-item/config-item.module';
import { MigrateComponent } from './migrate/migrate.component';

@NgModule({
    declarations: [
          PackageListComponent,
          ReleaseComponent,
          PackageDetailsComponent,
          MigrateComponent   
    ],
    imports: [
        ReleaseRoutingModule, 
        SharedModule,        
        ReactiveFormsModule,
        ConfigItemModule
    ]
})
export class ReleaseModule {}