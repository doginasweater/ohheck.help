import { Group, Subunit, Survey, Response, ResponseByCard, Notification } from 'types/admin';
import { Card, Idol } from 'types/commontypes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { get } from './utils';

import {
    GROUPS_FETCH,
    GROUPS_LIST_FETCH,
    SUBUNITS_FETCH,
    SUBUNITS_LIST_FETCH,
    IDOLS_FETCH,
    IDOLS_LIST_FETCH,
    SURVEYS_FETCH,
    RESPONSES_FETCH,
    RESPONSES_BYCARD_FETCH,
    CARDS_FETCH,
    CARD_FETCH
} from 'constants/admin';

import {
    groupsFetchFulfilled,
    groupsListFetchFulfilled,
    subunitsFetchFulfilled,
    subunitsListFetchFulfilled,
    idolsFetchFulfilled,
    idolsListFetchFulfilled,
    surveysFetchFulfilled,
    responsesFetchFulfilled,
    responsesByCardFetchFulfilled,
    setNotification,
    logoutWithNote,
    cardsFetchFulfilled,
    cardFetchFulFilled
} from 'actions/admin';

const genInner = <T>(action, state, endpoint: string, callback, errortext: string) =>
    get<T>(endpoint, state.getState().admin.bearer)
        .map(response => callback(response))
        .catch(error => {
            if (error.message === '401') {
                return Observable.of(logoutWithNote(Notification.info('Session expired. Please log in again.', 'epics', 'epics')));
            } else {
                return Observable.of(setNotification(Notification.error(errortext, 'epics', 'epics')))
            }
        });

const genEpic = <T>(action$, state, type: string, endpoint: string, callback, errortext: string) =>
    action$.ofType(type).mergeMap(action => genInner(action, state, endpoint, callback, errortext));

const makeHeaders = (state) => ({ 'Authorization': `bearer ${state.getState().admin.bearer}`})

export const fetchGroupsEpic = (action$, state) =>
    genEpic<Group[]>(action$, state, GROUPS_FETCH, '/admin/groups', groupsFetchFulfilled, 'Groups download failed');

export const fetchSubunitsEpic = (action$, state) =>
    genEpic<Subunit[]>(action$, state, SUBUNITS_FETCH, '/admin/subunits', subunitsFetchFulfilled, 'Subunits download failed');

export const fetchIdolsEpic = (action$, state) =>
    genEpic<Idol[]>(action$, state, IDOLS_FETCH, '/admin/idols', idolsFetchFulfilled, 'Idols download failed');

export const fetchGroupsListEpic = (action$, state) =>
    genEpic<Group[]>(action$, state, GROUPS_LIST_FETCH, '/admin/grouplist', groupsListFetchFulfilled, 'Groups list download failed');

export const fetchSubunitsListEpic = (action$, state) =>
    genEpic<Subunit[]>(action$, state, SUBUNITS_LIST_FETCH, '/admin/subunitlist', subunitsListFetchFulfilled, 'Subunits list download failed');

export const fetchIdolsListEpic = (action$, state) =>
    genEpic<Idol[]>(action$, state, IDOLS_LIST_FETCH, '/admin/idollist', idolsListFetchFulfilled, 'Idols list download failed');

export const fetchSurveysEpic = (action$, state) =>
    genEpic<Survey[]>(action$, state, SURVEYS_FETCH, '/admin/allsurveys', surveysFetchFulfilled, 'Surveys download failed');

export const fetchResponsesEpic = (action$, state) =>
    action$.ofType(RESPONSES_FETCH).mergeMap(action =>
        genInner<Response[]>(action, state, `/admin/responses/${action.id}`, responsesFetchFulfilled, 'Responses download failed'));

export const fetchResponsesByCardEpic = (action$, state) =>
    action$.ofType(RESPONSES_BYCARD_FETCH).mergeMap(action =>
        genInner<ResponseByCard[]>(action, state, `/admin/responsesbycard/${action.id}`, responsesByCardFetchFulfilled, 'Responses download failed'));

export const fetchCardsEpic = (action$, state) =>
    action$.ofType(CARDS_FETCH).mergeMap(action =>
        genInner<Card[]>(action, state, `/admin/cards?skip=${action.skip}&take=${action.take}`, cardsFetchFulfilled, 'Cards download failed'));

export const fetchCardEpic = (action$, state) =>
    action$.ofType(CARD_FETCH).mergeMap(action =>
        genInner<Card>(action, state, `/admin/card?id=${action.id}`, cardFetchFulFilled, 'Card download failed'));