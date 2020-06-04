import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Package } from '../model/package.model';
import { ConfigItem } from '../model/config-item.model';


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
        description?: string        
    },
    _links?: {
        self : {
            href: string
        }
    }
}

interface PackageListData {
    _embedded : {
        releasePackageList : PackageData[]
    },
    _links? : {
        self : {
            href: string
        }
    }
}

const httpOptions = {
    headers: new HttpHeaders({
                'Authorization' : 'Basic dXNlcjpwYXNzd29yZA=='
            })
};

@Injectable({'providedIn' : 'root'})
export class PackageDataService {

    constructor(private http: HttpClient) {}

    fetchPackages(env: string) {
        const url = environment[env + '_host'] + 'api/releasepackages';
        return this.http.get<PackageListData>(url, httpOptions).pipe(
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
            })
        );  
    }


    saveNewPackage(_package: Package) {       
        const url = environment[environment.env + '_host'] + 'api/releasepackages';
        let input = {..._package, tag: {no: _package.no}};
        console.log(input);
        return this.http.post<PackageData>(url, input, httpOptions).pipe(
            map(data => {
                console.log(data);
                return new Package(
                    data.id, data.tag.no, data.description,
                    data.createdOn, data.createdBy, data.committedOn, data.committedBy,
                    data.source, data.status);
            })
        );    
    }

    savePackage(_package: Package) {       
        const url = environment[environment.env + '_host'] + 'api/releasepackages/' + _package.id;
        let input = {..._package, tag: {no: _package.no}};
        console.log(input);
        return this.http.put<PackageData>(url, input, httpOptions).pipe(
            map(data => {
                console.log(data);
                return new Package(
                    data.id, data.tag.no, data.description,
                    data.createdOn, data.createdBy, data.committedOn, data.committedBy,
                    data.source, data.status);
            })
        );    
    }

    exportPackages(env: string, packages: Package[]) {
        const url = environment[env + '_host'] + 'api/releasepackages/import';
        let packagesdata = packages.map(p => {return {...p, tag: {no: p.no}};});
        console.log(packagesdata);
        return this.http.post<PackageListData>(url, packagesdata, httpOptions).pipe(
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
            })
        );
    }

    saveRepackedPackage(packageNo: string, configItems: ConfigItem[]) {
        const url = environment[environment.env + '_host'] + 'api/releasepackages/repack';
        let options = {
            ...httpOptions,
            params: new HttpParams().set('no', packageNo)
        }
        return this.http.post<ConfigItem[]>(url, configItems.map(i => i.id), options).pipe(
            map(data => {
                console.log(data);
                return ({no: packageNo, configItems: data}); 
            })
        );

    }


}