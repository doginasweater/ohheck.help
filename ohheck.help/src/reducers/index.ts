import { combineReducers } from 'redux';
import { survey } from './survey';
import { admin } from './admin';
import { surveymgmt } from './surveymgmt';

export const rootReducer = combineReducers({
    admin,
    survey,
    surveymgmt
});