import { Action, createReducer, on } from '@ngrx/store';
import { Package, unpackedPackageNo } from '../../../shared/model/package.model';
import * as PackageActions from './package.actions';
import { ConfigItem } from '../../../shared/model/config-item.model';

export interface State {
    packages: Package[];    
    configItems: Map<string, ConfigItem[]>;
}

const initialState: State = {
    // packages: [
    //     new Package(1, '1.0.0', 'Hydrogen', new Date('12/2/2020'), 'Dinesh', null, '', 'CDE', 'Open'),
    //     new Package(2, '2.0.0', 'Oxygen', new Date('10/3/2020'), 'John', new Date('11/4/2020'), 'Marcus', 'Test', 'Committed'),
    //     new Package(3, '3.0.0', 'Nitrogen', new Date('8/3/2020'), 'John', new Date('9/4/2020'), 'Sam', 'CDE', 'Committed')
    // ],
    packages: [],
    // configItems: new Map([
    //                     [unpackedPackageNo, [new ConfigItem(1, 'EOI', 'EOI1', '001', 'New')]],
    //                     ['1.0.0', [new ConfigItem(2, 'ACT', 'ACT1', '001', 'Change')]]
    //                 ])
    configItems: new Map<string, ConfigItem[]>([
            [unpackedPackageNo, []]
        ])
}

function reAssignConfigItems(m: Map<string, ConfigItem[]>, packageNo: string, tobeCIs: ConfigItem[]) {

    const asisCIs = m.get(packageNo) ? m.get(packageNo) : [];
    
    const asisCINos = new Set(asisCIs.map((ci, i) => ci.id));
    const tobeCINos = new Set(tobeCIs.map((ci, i) => ci.id));

    const removedCIs = asisCIs.filter((ci, i) => !tobeCINos.has(ci.id));
    const addedCINos = new Set(tobeCIs.filter((ci, i) => !asisCINos.has(ci.id)).map((ci, i) => ci.id));

    //filter the ones added to the package and add the ones removed from the package
    const unassignedCIs = m.get(unpackedPackageNo).filter((ci, i) => !addedCINos.has(ci.id)).concat(removedCIs);

    m.set(packageNo, tobeCIs);
    m.set(unpackedPackageNo, unassignedCIs);

    return m;
}


export function packageReducer(packageState: State | undefined, packageAction: Action) {
    return createReducer(
        initialState,
        on(PackageActions.setPackages, (state, action) => ( {...state, packages:[...action.packages]} )),
        on(PackageActions.createPackage, (state, action) => ( 
            {...state, packages: state.packages.concat(action.package)} )
        ),
        on(PackageActions.updatePackage, (state, action) => ( 
            {...state, 
                packages: state.packages
                        .map((_package, i) => _package.no === action.package.no ? {...action.package} : _package)
            })
        ),
        on(PackageActions.setConfigItems, (state, action) => (
            {...state,
                configItems: new Map(state.configItems).set(action.packageNo, action.configItems)
            })
        ),
        on(PackageActions.repackPackage, (state, action) => (
            {...state,
                configItems: reAssignConfigItems(new Map(state.configItems), action.packageNo, action.configItems)            
            }
        ))
    )(packageState, packageAction);    
}