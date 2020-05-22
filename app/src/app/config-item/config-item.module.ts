import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ConfigItemListComponent } from './config-item-list/config-item-list.component';
import { ConfigItemListPickerComponent } from './config-item-list-picker/config-item-list-picker.component';


@NgModule({
    declarations: [
        ConfigItemListComponent,
        ConfigItemListPickerComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ConfigItemListComponent,
        ConfigItemListPickerComponent
    ]
})

export class ConfigItemModule {}