import {createAction, props} from '@ngrx/store';
import { Package } from 'src/app/shared/model/package.model';

export const setPackages = createAction('[Migrate] Set Packages', props<{ targetEnv: string, packages: Package[] }>());
export const exportPackages = createAction('[Migrate] Export Packages', props<{ packages: Package[] }>());