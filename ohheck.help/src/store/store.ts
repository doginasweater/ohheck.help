import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(epicMiddleware)
    )
);