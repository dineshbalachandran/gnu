import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConfigItem } from '../model/config-item.model';

const httpOptions = {
    headers: new HttpHeaders({
                'Authorization' : 'Basic dXNlcjpwYXNzd29yZA=='
            })
};

@Injectable({'providedIn' : 'root'})
export class ConfigItemDataService {

    constructor(private http: HttpClient) {}

    fetchConfigItems(no: string) {
        const url = environment[environment.env + '_host'] + 'api/configurationitems';
        let options = {
            ...httpOptions,
            params: new HttpParams().set('no', no)
        }
        return this.http.get<ConfigItem[]>(url, options).pipe(
            map(data => {
                console.log(data);
                return ({no: no, configItems: data});
            })
        );
    }

}