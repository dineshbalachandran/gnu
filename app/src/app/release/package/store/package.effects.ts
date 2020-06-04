import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PackageActions from './package.actions';
import { switchMap, map} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { PackageDataService } from '../../../shared/dataservice/package-data.service';
import { ConfigItemDataService } from '../../../shared/dataservice/config-item-data.service';

@Injectable()
export class PackageEffects {
    constructor(private actions$: Actions, 
        private packageDataService: PackageDataService,
        private configItemDataService: ConfigItemDataService) {}

    fetchPackages = createEffect(() => 
        this.actions$.pipe(
            ofType(PackageActions.fetchPackages),
            switchMap(() => this.packageDataService.fetchPackages(environment.env)),
            map(packages => { return PackageActions.setPackages({packages}); })        
    ));

    saveNewPackage = createEffect(() =>
        this.actions$.pipe(
            ofType(PackageActions.saveNewPackage),
            switchMap(action => {
                return this.packageDataService.saveNewPackage(action.package);
            }),
            map(_package => { return PackageActions.createPackage({package: _package}); })
    ));

    savePackage = createEffect(() => 
        this.actions$.pipe(
            ofType(PackageActions.savePackage),
            switchMap(action => {
                return this.packageDataService.savePackage(action.package);
            }),
            map(_package => { return PackageActions.updatePackage({package: _package}); })        
    ));

    fetchConfigItems = createEffect(() =>
        this.actions$.pipe(
            ofType(PackageActions.fetchConfigItems),
            switchMap(action => this.configItemDataService.fetchConfigItems(action.packageNo)),
            map(data => { return PackageActions.setConfigItems({packageNo: data.no, configItems: data.configItems}); })
    ));

    saveRepackedConfigItems = createEffect(() =>
        this.actions$.pipe(
            ofType(PackageActions.saveRepackedPackage),
            switchMap(action => this.packageDataService.saveRepackedPackage(action.packageNo, action.configItems)),
            map(data => { return PackageActions.repackPackage({packageNo: data.no, configItems: data.configItems}); })
    ));

}