import {createAction, props} from '@ngrx/store';
import { Package } from 'src/app/shared/model/package.model';

export const fetchPackages = createAction('[Packages] Fetch Packages', props< {env:string} >());
export const setPackages = createAction('[Packages] Set Packages', props<{ packages: Package[] }>());
export const updatePackage = createAction('[Packages] Update Package', props<{ no: number, package: Package }>());
export const savePackage = createAction('[Packages] Save Package', props<{ package: Package }>());
export const addPackage = createAction('[Packages] Add Package', props<{ package: Package }>());

