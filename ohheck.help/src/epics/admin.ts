import { Group, Subunit, Survey, Response, ResponseByCard, Notification } from 'types/admin';
import { Card, Idol } from 'types/commontypes';
import { get, genEpic, genInner, post, serverResp } from './utils';

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
    CARD_FETCH,
    IDOL_FETCH,
    SUBUNIT_FETCH,
    SETTINGS_FETCH,
    SETTINGS_UPDATE
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
    cardFetchFulFilled,
    idolFetchFulfilled,
    subunitFetchFulfilled,
    settingsFetchFulFilled,
    settingsUpdateFulfilled
} from 'actions/admin';

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

export const fetchSettingsEpic = (action$, state) =>
    genEpic(action$, state, SETTINGS_FETCH, '/admin/settings', settingsFetchFulFilled, 'Settings download failed');

export const fetchResponsesEpic = (action$, state) =>
    action$.ofType(RESPONSES_FETCH).mergeMap(action =>
        genInner<Response[]>(action, state, `/admin/responses/${action.id}`, responsesFetchFulfilled, 'Responses download failed'));

export const fetchResponsesByCardEpic = (action$, state) =>
    action$.ofType(RESPONSES_BYCARD_FETCH).mergeMap(action =>
        genInner<ResponseByCard[]>(action, state, `/admin/surveysbycard/${action.id}`, responsesByCardFetchFulfilled, 'Responses download failed'));

export const fetchCardsEpic = (action$, state) =>
    action$.ofType(CARDS_FETCH).mergeMap(action =>
        genInner<Card[]>(action, state, `/admin/cards?skip=${action.skip}&take=${action.take}`, cardsFetchFulfilled, 'Cards download failed'));

export const fetchCardEpic = (action$, state) =>
    action$.ofType(CARD_FETCH).mergeMap(action =>
        genInner<Card>(action, state, `/admin/card?id=${action.id}`, cardFetchFulFilled, 'Card download failed'));

export const fetchIdolEpic = (action$, state) =>
    action$.ofType(IDOL_FETCH).mergeMap(action =>
        genInner<Idol>(action, state, `/admin/idol?id=${action.id}`, idolFetchFulfilled, 'Idol download failed'));

export const fetchSubunitEpic = (action$, state) =>
    action$.ofType(SUBUNIT_FETCH).mergeMap(action =>
        genInner<Subunit>(action, state, `/admin/subunit?id=${action.id}`, subunitFetchFulfilled, 'Subunit download failed'));

export const submitSettingEpic = (action$, state) =>
    action$.ofType(SETTINGS_UPDATE).mergeMap(action =>
        post<serverResp>('/admin/updatesetting', { key: action.key, value: action.value }, state.getState().admin.bearer)
            .map(resp => settingsUpdateFulfilled(resp.success, resp.message)));