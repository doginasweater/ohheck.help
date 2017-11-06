import { get } from 'types/commontypes/storage';
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
    AUTHENTICATE, LOGOUT, LOGOUT_WITH_NOTE,
    GROUPS_FETCH, GROUPS_FETCH_FULFILLED, GROUPS_LIST_FETCH, GROUPS_LIST_FETCH_FULFILLED,
    SUBUNITS_FETCH, SUBUNITS_FETCH_FULFILLED, SUBUNITS_LIST_FETCH, SUBUNITS_LIST_FETCH_FULFILLED, IDOLS_FETCH,
    IDOLS_FETCH_FULFILLED, IDOLS_LIST_FETCH, IDOLS_LIST_FETCH_FULFILLED,
    SURVEYS_FETCH, SURVEYS_FETCH_FULFILLED,
    RESPONSES_FETCH, RESPONSES_FETCH_FULFILLED,
    RESPONSES_BYCARD_FETCH, RESPONSES_BYCARD_FETCH_FULFILLED,
    SET_NOTIFICATION, DISMISS_NOTIFICATION,
    CARDS_FETCH, CARDS_FETCH_FULFILLED,
    CARD_FETCH, CARD_FETCH_FULFILLED,
    IDOL_FETCH, IDOL_FETCH_FULFILLED,
    SUBUNIT_FETCH, SUBUNIT_FETCH_FULFILLED
} from 'constants/admin';

const storage = window.localStorage;

const AdminInitial: IAdminStore = {
    bearer: storage.getItem('bearer') || '',
    loginvalid: storage.getItem('expiration') ? new Date(storage.getItem('expiration') || '') : new Date(),
    error: false,
    errorMessage: '',
    groups: null,
    groupslight: [],
    groupsloading: true,
    subunits: null,
    subunitslight: [],
    subunitsloading: true,
    idols: null,
    idolslight: [],
    idolsloading: true,
    surveys: null,
    surveysloading: true,
    surveyid: -1,
    responses: null,
    responsesloading: true,
    responsesbycard: null,
    responsesbycardloading: true,
    notifications: [],
    cardsloading: false,
    cards: [],
    skip: 0,
    take: 50,
    fullcards: [],
    cardloading: false,
    fullidols: [],
    idolloading: false,
    fullsubunits: [],
    subunitloading: false,
    akipage: '',
    akipageloading: false
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
                ]
            };
        case AUTHENTICATE:
            return {
                ...state,
                bearer: action.token,
                loginvalid: action.expiration
            };
        case LOGOUT:
            return {
                ...state,
                bearer: '',
                loginvalid: undefined
            };
        case LOGOUT_WITH_NOTE:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.notification
                ],
                bearer: '',
                loginvalid: undefined
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
        case CARDS_FETCH:
            return {
                ...state,
                cardsloading: true,
                skip: action.skip,
                take: action.take
            };
        case CARDS_FETCH_FULFILLED:
            return {
                ...state,
                cardsloading: false,
                cards: action.cards
            };
        case CARD_FETCH:
            return {
                ...state,
                cardloading: true
            };
        case CARD_FETCH_FULFILLED:
            return {
                ...state,
                fullcards: [
                    ...state.fullcards || [],
                    action.card
                ],
                cardloading: false
            };
        case IDOL_FETCH:
            return {
                ...state,
                idolloading: true
            };
        case IDOL_FETCH_FULFILLED:
            return {
                ...state,
                idolloading: false,
                fullidols: [
                    ...state.fullidols,
                    action.idol
                ]
            };
        case SUBUNIT_FETCH:
            return {
                ...state,
                subunitloading: true
            };
        case SUBUNIT_FETCH_FULFILLED:
            return {
                ...state,
                subunitloading: false,
                fullsubunits: [
                    ...state.fullsubunits,
                    action.subunit
                ]
            };
        default:
            return state;
    }
}