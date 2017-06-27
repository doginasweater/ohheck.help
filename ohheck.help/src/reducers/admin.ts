import { Group, Subunit, Idol, Survey, Response } from '../types/admin';

import {
    SET_ERROR,
    DISMISS_ERROR,
    AUTHENTICATE,
    LOGOUT,
    GROUPS_FETCH,
    GROUPS_FETCH_FULFILLED,
    SUBUNITS_FETCH,
    SUBUNITS_FETCH_FULFILLED,
    IDOLS_FETCH,
    IDOLS_FETCH_FULFILLED,
    SURVEYS_FETCH,
    SURVEYS_FETCH_FULFILLED,
    RESPONSES_FETCH,
    RESPONSES_FETCH_FULFILLED
} from '../constants/admin';

interface IAdminStore {
    error: boolean;
    errorMessage: string;
    authenticated: boolean;
    groups?: Group[];
    groupsloading: boolean;
    subunits: Subunit[];
    subunitsloading: boolean;
    idols?: Idol[];
    idolsloading: boolean;
    surveys?: Survey[];
    surveysloading: boolean;
    surveyid: number;
    responses?: Response[];
    responsesloading: boolean;
}

const AdminInitial: IAdminStore = {
    error: false,
    errorMessage: '',
    authenticated: false,
    groups: null,
    groupsloading: true,
    subunits: null,
    subunitsloading: true,
    idols: null,
    idolsloading: true,
    surveys: null,
    surveysloading: true,
    surveyid: -1,
    responses: null,
    responsesloading: true
};

export function admin(state = AdminInitial, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.error
            };
        case DISMISS_ERROR:
            return {
                ...state,
                error: false,
                errorMessage: ''
            };
        case AUTHENTICATE:
            return {
                ...state,
                authenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            };
        case GROUPS_FETCH:
            return {
                ...state,
                groupsloading: true
            };
        case GROUPS_FETCH_FULFILLED:
            return {
                ...state,
                groupsloading: false,
                groups: action.groups
            };
        case SUBUNITS_FETCH:
            return {
                ...state,
                subunitsloading: true
            };
        case SUBUNITS_FETCH_FULFILLED:
            return {
                ...state,
                subunitsloading: false,
                subunits: action.subunits
            };
        case IDOLS_FETCH:
            return {
                ...state,
                idolsloading: true
            };
        case IDOLS_FETCH_FULFILLED:
            return {
                ...state,
                idolsloading: false,
                idols: action.idols
            };
        case SURVEYS_FETCH:
            return {
                ...state,
                surveysloading: true
            };
        case SURVEYS_FETCH_FULFILLED:
            return {
                ...state,
                surveysloading: false,
                surveys: action.surveys
            };
        case RESPONSES_FETCH:
            return {
                ...state,
                responsesloading: true,
                surveyid: action.id
            };
        case RESPONSES_FETCH_FULFILLED:
            return {
                ...state,
                responsesloading: false,
                responses: action.responses
            };
        default:
            return state;
    }
}