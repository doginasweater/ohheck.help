import { Notification } from 'types/admin';
import { Card, Idol } from "types/commontypes";

import {
    AUTHENTICATE,
    LOGOUT,
    LOGOUT_WITH_NOTE,
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
    DISMISS_NOTIFICATION,
    CARDS_FETCH,
    CARDS_FETCH_FULFILLED,
    CARD_FETCH,
    CARD_FETCH_FULFILLED,
    IDOL_FETCH,
    IDOL_FETCH_FULFILLED
} from 'constants/admin';

export const setNotification = (notification: Notification) => ({ type: SET_NOTIFICATION, notification });
export const dismissNotification = (notification: Notification) => ({ type: DISMISS_NOTIFICATION, notification });

export const authenticate = (token: string, expiration: Date) => {
    window.localStorage.setItem('bearer', token);
    window.localStorage.setItem('expiration', expiration.toUTCString());

    return {
        type: AUTHENTICATE,
        token,
        expiration
    }
}

export const logout = () => {
    window.localStorage.setItem('bearer', '');
    window.localStorage.setItem('expiration', '');

    return {
        type: LOGOUT
    }
}

export const logoutWithNote = (notification: Notification) => {
    window.localStorage.setItem('bearer', '');
    window.localStorage.setItem('expiration', '');

    return {
        type: LOGOUT_WITH_NOTE,
        notification
    };
}

export const groupsFetch = () => ({ type: GROUPS_FETCH });
export const groupsFetchFulfilled = groups => ({ type: GROUPS_FETCH_FULFILLED, groups });
export const groupsListFetch = () => ({ type: GROUPS_LIST_FETCH });
export const groupsListFetchFulfilled = groupsList => ({ type: GROUPS_LIST_FETCH_FULFILLED, groupsList });

export const subunitsFetch = () => ({ type: SUBUNITS_FETCH });
export const subunitsFetchFulfilled = subunits => ({ type: SUBUNITS_FETCH_FULFILLED, subunits });
export const subunitsListFetch = () => ({ type: SUBUNITS_LIST_FETCH });
export const subunitsListFetchFulfilled = subunitsList => ({ type: SUBUNITS_LIST_FETCH_FULFILLED, subunitsList });

export const idolsFetch = () => ({ type: IDOLS_FETCH });
export const idolsFetchFulfilled = idols => ({ type: IDOLS_FETCH_FULFILLED, idols });
export const idolsListFetch = () => ({ type: IDOLS_LIST_FETCH });
export const idolsListFetchFulfilled = idolsList => ({ type: IDOLS_LIST_FETCH_FULFILLED, idolsList });

export const surveysFetch = () => ({ type: SURVEYS_FETCH });
export const surveysFetchFulfilled = surveys => ({ type: SURVEYS_FETCH_FULFILLED, surveys });

export const responsesFetch = id => ({ type: RESPONSES_FETCH, id });
export const responsesFetchFulfilled = responses => ({ type: RESPONSES_FETCH_FULFILLED, responses });

export const responsesByCardFetch = id => ({ type: RESPONSES_BYCARD_FETCH, id });
export const responsesByCardFetchFulfilled = cards => ({ type: RESPONSES_BYCARD_FETCH_FULFILLED, cards });

export const cardsFetch = (skip: number, take: number) => ({ type: CARDS_FETCH, skip, take });
export const cardsFetchFulfilled = (cards: Card[]) => ({ type: CARDS_FETCH_FULFILLED, cards });

export const cardFetch = (id: number) => ({ type: CARD_FETCH, id });
export const cardFetchFulFilled = (card: Card) => ({ type: CARD_FETCH_FULFILLED, card });

export const idolFetch = (id: number) => ({ type: IDOL_FETCH, id });
export const idolFetchFulfilled = (idol: Idol) => ({ type: IDOL_FETCH_FULFILLED, idol });