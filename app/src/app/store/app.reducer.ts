import { ActionReducerMap } from '@ngrx/store';
import * as fromPackage from '../release/package/store/package.reducer';
import * as fromMigrate from '../release/migrate/store/migrate.reducer';

export interface State {
    package: fromPackage.State;
    migrate: fromMigrate.State;
}

export const appReducer: ActionReducerMap<State> = {
    package: fromPackage.packageReducer,
    migrate: fromMigrate.migrateReducer
}