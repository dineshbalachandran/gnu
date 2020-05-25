import { Action, createReducer, on } from '@ngrx/store';
import { Package } from '../../../shared/model/package.model';
import * as MigrateActions from './migrate.actions';

export interface State {
    targetEnv: string;
    packages: Package[];
}

const initialState : State = {
    targetEnv: '',
    packages: []
}

export function migrateReducer(migrateState: State | undefined, migrateAction: Action) {
    return createReducer(
        initialState,
        on(MigrateActions.setPackages, (state, action) => (
            {...state, packages: [...action.packages], targetEnv: action.targetEnv}
        ))
    )(migrateState, migrateAction);
}