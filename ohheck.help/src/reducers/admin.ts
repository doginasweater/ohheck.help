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
    SUBUNITS_FETCH,
    SUBUNITS_FETCH_FULFILLED,
    IDOLS_FETCH,
    IDOLS_FETCH_FULFILLED,
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
    groupsloading: true,
    subunits: null,
    subunitsloading: true,
    idols: null,
    idolsloading: true,
    surveys: null,
    surveysloading: true,
    surveyid: -1,
    responses: null,
    responsesloading: true,
    responsesbycard: null,
    responsesbycardloading: true,
    notifications: [
        new Notification({
            id: 1,
            level: 'info',
            text: 'It is 7/15, new cards are expected in the api. Go to settings to sync them.',
            seen: false,
            action: {
                type: 'link',
                location: '/dashboard/settings',
                text: 'Settings'
            },
            created: new Date('2017-07-13 00:00'),
            createdby: 'kevin',
            modified: new Date('2017-07-13 00:00'),
            modifiedby: 'kevin',
        }),
        new Notification({
            id: 2,
            level: 'error',
            text: 'Last sync failed!',
            seen: false,
            created: new Date('2017-07-13 00:00'),
            createdby: 'kevin',
            modified: new Date('2017-07-13 00:00'),
            modifiedby: 'kevin',
        }),
        new Notification({
            id: 3,
            level: 'success',
            text: 'Card/idol sync succeeded',
            seen: false,
            action: {
                text: 'View cards',
                location: '/dashboard/cards',
                type: 'link'
            },
            created: new Date('2017-07-13 00:00'),
            createdby: 'kevin',
            modified: new Date('2017-07-13 00:00'),
            modifiedby: 'kevin',
        }),
        new Notification({
            id: 4,
            level: 'warning',
            text: 'Card/idol sync succeeded with errors',
            seen: false,
            action: {
                text: 'View errors',
                location: '/dashboard/cards',
                type: 'link'
            },
            created: new Date('2017-07-13 00:00'),
            createdby: 'kevin',
            modified: new Date('2017-07-13 00:00'),
            modifiedby: 'kevin',
        })
    ]
};

export function admin(state = AdminInitial, action) {
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