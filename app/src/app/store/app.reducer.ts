import { ActionReducerMap } from '@ngrx/store';
import * as fromPackage from '../release/package/store/package.reducer';

export interface State {
    package: fromPackage.State;
}

export const appReducer: ActionReducerMap<State> = {
    package: fromPackage.packageReducer
}