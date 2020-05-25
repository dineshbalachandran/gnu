import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ReleaseComponent } from './release.component';
import { PackageListComponent } from './package/package-list/package-list.component';
import { ReleaseRoutingModule } from './release-routing.module';
import { PackageDetailsComponent } from './package/package-details/package-details.component';
import { ConfigItemModule } from '../config-item/config-item.module';
import { MigrateComponent } from './migrate/migrate.component';
import { PackageCreateComponent } from './package/package-create/package-create.component';

@NgModule({
    declarations: [
          PackageListComponent,
          ReleaseComponent,
          PackageDetailsComponent,
          MigrateComponent,
          PackageCreateComponent   
    ],
    imports: [
        ReleaseRoutingModule, 
        SharedModule,
        FormsModule,        
        ReactiveFormsModule,
        ConfigItemModule
    ],
    entryComponents: [PackageCreateComponent]
})
export class ReleaseModule {}