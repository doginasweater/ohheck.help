import { combineReducers } from 'redux';
import { admin } from './admin';
import { survey } from './survey';
import { surveymgmt } from './surveymgmt';

export const rootReducer = combineReducers({
    admin,
    survey,
    surveymgmt
});
