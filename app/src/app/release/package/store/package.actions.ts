import {createAction, props} from '@ngrx/store';
import { Package } from '../../../shared/model/package.model';
import { ConfigItem } from '../../../shared/model/config-item.model';

export const fetchPackages = createAction('[Packages] Fetch Packages', props<{env: string}>());
export const setPackages = createAction('[Packages] Set Packages', props<{packages: Package[]}>());
export const updatePackage = createAction('[Packages] Update Package', props<{package: Package}>());
export const saveNewPackage = createAction('[Packages] Save New Package', props<{package: Package}>());
export const createPackage = createAction('[Packages] Create Package', props<{package: Package}>());

export const fetchConfigItems = createAction('[Packages] Fetch Config Items', props<{packageNo: string}>());
export const setConfigItems = createAction('[Packages] Set Config Items', props<{packageNo: string, configItems: ConfigItem[]}>());
export const repackConfigItems = createAction('[Packages] Repack Config Items', props<{packageNo: string, configItems: ConfigItem[]}>());
export const saveRepackgedConfigItems = createAction('[Packages] Save Repacked Config Items', props<{packageNo: string, configItems: ConfigItem[]}>());

