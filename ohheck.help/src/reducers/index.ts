import { combineReducers } from 'redux';
import { survey } from './survey';
import { admin } from './admin';

export const rootReducer = combineReducers({
    admin,
    survey
});