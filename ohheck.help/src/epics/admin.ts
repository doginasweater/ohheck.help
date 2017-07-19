import { Group, Subunit, Survey, Response, ResponseByCard, Notification } from 'types/admin';
import { Idol } from 'types/commontypes';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import {
    GROUPS_FETCH,
    GROUPS_LIST_FETCH,
    SUBUNITS_FETCH,
    SUBUNITS_LIST_FETCH,
    IDOLS_FETCH,
    IDOLS_LIST_FETCH,
    SURVEYS_FETCH,
    RESPONSES_FETCH,
    RESPONSES_BYCARD_FETCH
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
    setNotification
} from 'actions/admin';

const makeHeaders = state => ({
    'Authorization': `bearer ${state.getState().admin.bearer}`
})

export const fetchGroupsEpic = (action$, state) =>
    action$.ofType(GROUPS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/groups', makeHeaders(state))
                .map((response: Group[]) => response.map(item => new Group(item)))
                .map(groups => groupsFetchFulfilled(groups))
                .catch(error => Observable.of(
                    setNotification(Notification.error(`Groups download failed.`, 'epics', 'epics')
                )))
        );

export const fetchSubunitsEpic = (action$, state) =>
    action$.ofType(SUBUNITS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/subunits', makeHeaders(state))
                .map((response: Subunit[]) => response.map(item => new Subunit(item)))
                .map(subunits => subunitsFetchFulfilled(subunits))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Subunits download failed', 'epics', 'epics')
                )))
        );

export const fetchIdolsEpic = (action$, state) =>
    action$.ofType(IDOLS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/idols', makeHeaders(state))
                .map((response: Idol[]) => response.map(item => new Idol(item)))
                .map(idols => idolsFetchFulfilled(idols))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Idols download failed', 'epics', 'epics')
                )))
        );

export const fetchGroupsListEpic = (action$, state) =>
    action$.ofType(GROUPS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/grouplist', makeHeaders(state))
                .map((response: Group[]) => response.map(item => new Group(item)))
                .map(groups => groupsListFetchFulfilled(groups))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Groups list download failed', 'epics', 'epics')
                )))
        );

export const fetchSubunitsListEpic = (action$, state) =>
    action$.ofType(SUBUNITS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/subunitlist', makeHeaders(state))
                .map((response: Subunit[]) => response.map(item => new Subunit(item)))
                .map(subunits => subunitsListFetchFulfilled(subunits))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Subunits list download failed', 'epics', 'epics')
                )))
        );

export const fetchIdolsListEpic = (action$, state) =>
    action$.ofType(IDOLS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/idollist', makeHeaders(state))
                .map((response: Idol[]) => response.map(item => new Idol(item)))
                .map(idols => idolsListFetchFulfilled(idols))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Idols list download failed', 'epics', 'epics')
                )))
        );

export const fetchSurveysEpic = (action$, state) =>
    action$.ofType(SURVEYS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/allsurveys', makeHeaders(state))
                .map((response: Survey[]) => response.map(item => new Survey(item)))
                .map(surveys => surveysFetchFulfilled(surveys))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Surveys download failed', 'epics', 'epics')
                )))
        );

export const fetchResponsesEpic = (action$, state) =>
    action$.ofType(RESPONSES_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/responses/${action.id}`, makeHeaders(state))
                .map((response: Response[]) => response.map(item => new Response(item)))
                .map(responses => responsesFetchFulfilled(responses))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Responses download failed', 'epics', 'epics')
                )))
        );

export const fetchResponsesByCardEpic = (action$, state) =>
    action$.ofType(RESPONSES_BYCARD_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/surveysbycard/${action.id}`, makeHeaders(state))
                .map((response: ResponseByCard[]) => response.map(item => new ResponseByCard(item)))
                .map(responses => responsesByCardFetchFulfilled(responses))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Responses download failed', 'epics', 'epics')
                )))
        );