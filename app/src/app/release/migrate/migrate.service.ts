import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Package, PackageStatus } from '../../shared/model/package.model';
import { PackageDataService } from '../../shared/dataservice/package-data.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MigrateService {
    
    packagesUpdated = new Subject<Package[]>();
    exportedPackages : Package[] = [];

    constructor(private packageDataService: PackageDataService, private store: Store<fromApp.State>) {}

    fetchPackagesForExport(targetEnv: string) {
        this.packageDataService.fetchPackages(targetEnv).pipe(
            withLatestFrom(this.store.select('package').pipe(map(packageState => packageState.packages))),
            map(([targetPackages, sourcePackages]) => {
                let targetCommitted = new Set(targetPackages.filter(p => p.status === PackageStatus.COMMITTED).map(p => p.no));
                return sourcePackages.filter(p => p.status === PackageStatus.COMMITTED && !targetCommitted.has(p.no));                
            })
        ).subscribe((packages => this.packagesUpdated.next(packages)));
    }

    exportPackages(targetEnv:string, packages: Package[]) {
        return this.packageDataService.exportPackages(targetEnv, packages);
    }
}