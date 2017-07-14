import { Idol } from 'types/commontypes';
import { IAdminStore } from 'types/redux';
import {
    Group,
    Subunit,
    Survey,
    Response,
    ResponseByCard,
    Notification
} from 'types/admin';

import {
    AUTHENTICATE,
    LOGOUT,
    GROUPS_FETCH,
    GROUPS_FETCH_FULFILLED,
    GROUPS_LIST_FETCH,
    GROUPS_LIST_FETCH_FULFILLED,
    SUBUNITS_FETCH,
    SUBUNITS_FETCH_FULFILLED,
    SUBUNITS_LIST_FETCH,
    SUBUNITS_LIST_FETCH_FULFILLED,
    IDOLS_FETCH,
    IDOLS_FETCH_FULFILLED,
    IDOLS_LIST_FETCH,
    IDOLS_LIST_FETCH_FULFILLED,
    SURVEYS_FETCH,
    SURVEYS_FETCH_FULFILLED,
    RESPONSES_FETCH,
    RESPONSES_FETCH_FULFILLED,
    RESPONSES_BYCARD_FETCH,
    RESPONSES_BYCARD_FETCH_FULFILLED,
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION
} from 'constants/admin';

const AdminInitial: IAdminStore = {
    error: false,
    errorMessage: '',
    authenticated: false,
    groups: null,
    groupslight: null,
    groupsloading: true,
    subunits: null,
    subunitslight: null,
    subunitsloading: true,
    idols: null,
    idolslight: null,
    idolsloading: true,
    surveys: null,
    surveysloading: true,
    surveyid: -1,
    responses: null,
    responsesloading: true,
    responsesbycard: null,
    responsesbycardloading: true,
    notifications: []
};

export const admin = (state = AdminInitial, action): IAdminStore => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.notification
                ]
            };
        case DISMISS_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter((item: Notification) => item.id !== action.notification.id),
                    action.notification
                ]
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
        case GROUPS_LIST_FETCH:
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
        case GROUPS_LIST_FETCH_FULFILLED:
            return {
                ...state,
                groupsloading: false,
                groupslight: action.groupsList
            };
        case SUBUNITS_FETCH:
        case SUBUNITS_LIST_FETCH:
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
        case SUBUNITS_LIST_FETCH_FULFILLED:
            return {
                ...state,
                subunitsloading: false,
                subunitslight: action.subunitsList
            };
        case IDOLS_FETCH:
        case IDOLS_LIST_FETCH:
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
        case IDOLS_LIST_FETCH_FULFILLED:
            return {
                ...state,
                idolsloading: false,
                idolslight: action.idolsList
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
        case RESPONSES_BYCARD_FETCH:
            return {
                ...state,
                responsesbycardloading: true,
                surveyid: action.id
            };
        case RESPONSES_BYCARD_FETCH_FULFILLED:
            return {
                ...state,
                responsesbycardloading: false,
                responsesbycard: action.cards
            };
        default:
            return state;
    }
}