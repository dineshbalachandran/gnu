import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Package } from '../../shared/model/package.model';

@Injectable({providedIn: 'root'})
export class MigrateService {
    
    packagesUpdated = new Subject<Package[]>();

    constructor() {}

    fetchPackagesForExport(targetEnv: string) {
        this.packagesUpdated.next([new Package('2.0.0', 'Oxygen', new Date('10/3/2020'), 'John', new Date('11/4/2020'), 'Marcus', 'Test', 'Committed')]);
    }

    exportPackages(packages: Package[]) {
        console.log(packages);
    }
}