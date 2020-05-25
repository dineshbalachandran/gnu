import { Action, createReducer, on } from '@ngrx/store';
import { Package } from 'src/app/shared/model/package.model';
import * as PackageActions from './package.actions';

export interface State {
    packages : Package[];
}

const initialState: State = {
    packages: [
        new Package(1, 'Hydrogen', new Date('12/2/2020'), 'Dinesh', null, '', 'CDE', 'Open'),
        new Package(2, 'Oxygen', new Date('10/3/2020'), 'John', new Date('11/4/2020'), 'Marcus', 'Test', 'Committed')
    ]
}

export function packageReducer(packageState: State | undefined, packageAction: Action) {
    return createReducer(
        initialState,
        on(PackageActions.setPackages, (state, action) => ( {...state, packages:[...action.packages]} )),
        on(PackageActions.addPackage, (state, action) => ( 
            {...state, packages: state.packages.concat(action.package)} )
        ),
        on(PackageActions.updatePackage, (state, action) => ( 
            {...state, 
                packages: state.packages
                        .map((_package, i) => _package.no === action.no ? {...action.package} : _package)
            })
        )
    )(packageState, packageAction);    
}