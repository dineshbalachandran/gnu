import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import * as fromApp from '../../../store/app.reducer';
import * as PackageActions from './package.actions';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Package } from 'src/app/shared/model/package.model';

interface PackageData {
    id: number,
    description: string,
    source: string,
    status: string,
    createdOn: Date,
    createdBy: string,
    committedOn: Date,
    committedBy: string,
    tag : {
        no: string,
        description: string
    },
    _links: {
        self : {
            href: string
        }
    }
}

interface PackageListData {
    _embedded : {
        releasePackageList : PackageData[]
    },
    _links : {
        self : {
            href: string
        }
    }
}

const httpOptions = {
    headers: new HttpHeaders( {
                'Authorization' : 'Basic dXNlcjpwYXNzd29yZA=='
            })
};

@Injectable()
export class PackageEffects {
    constructor(private actions$: Actions, private http: HttpClient) {}

    fetchPackages = createEffect(() => 
        this.actions$.pipe(
            ofType(PackageActions.fetchPackages),
            switchMap(action => {                
                const url = environment[action.env + '_host'] + 'api/releasepackages';
                return this.http.get<PackageListData>(url, httpOptions);
            }),
            map(data => {
                console.log(data);
                return data._embedded != null ? 
                    data._embedded.releasePackageList.map(p => {
                        return new Package(
                            p.id, p.tag.no, p.description, 
                            p.createdOn, p.createdBy, p.committedOn, p.committedBy,
                            p.source, p.status);                    
                    }) :                    
                    [];
            }),
            map(packages => { return PackageActions.setPackages({packages}); })        
    ));

    saveNewPackage = createEffect(() =>
        this.actions$.pipe(
            ofType(PackageActions.saveNewPackage),
            switchMap(action => {
                const url = environment[environment.env + '_host'] + 'api/releasepackages';
                const packagedata = {...action.package, tag: {no: action.package.no}};
                console.log(packagedata);
                return this.http.post<PackageData>(url, packagedata, httpOptions);
            }),
            map(data => {
                console.log(data);
                return new Package(
                    data.id, data.tag.no, data.description,
                    data.createdOn, data.createdBy, data.committedOn, data.committedBy,
                    data.source, data.status);
            }),
            map(_package => { return PackageActions.createPackage({package: _package}); })
    ));
}