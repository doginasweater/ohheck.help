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

export const fetchGroupsEpic = action$ =>
    action$.ofType(GROUPS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/grups')
                .map((response: Group[]) => response.map(item => new Group(item)))
                .map(groups => groupsFetchFulfilled(groups))
                .catch(error => Observable.of(
                    setNotification(Notification.error(`Groups download failed.`, 'epics', 'epics')
                )))
        );

export const fetchSubunitsEpic = action$ =>
    action$.ofType(SUBUNITS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/subunits')
                .map((response: Subunit[]) => response.map(item => new Subunit(item)))
                .map(subunits => subunitsFetchFulfilled(subunits))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Subunits download failed', 'epics', 'epics')
                )))
        );

export const fetchIdolsEpic = action$ =>
    action$.ofType(IDOLS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/idols')
                .map((response: Idol[]) => response.map(item => new Idol(item)))
                .map(idols => idolsFetchFulfilled(idols))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Idols download failed', 'epics', 'epics')
                )))
        );

export const fetchGroupsListEpic = action$ =>
    action$.ofType(GROUPS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/grouplist')
                .map((response: Group[]) => response.map(item => new Group(item)))
                .map(groups => groupsListFetchFulfilled(groups))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Groups list download failed', 'epics', 'epics')
                )))
        );

export const fetchSubunitsListEpic = action$ =>
    action$.ofType(SUBUNITS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/subunitlist')
                .map((response: Subunit[]) => response.map(item => new Subunit(item)))
                .map(subunits => subunitsListFetchFulfilled(subunits))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Subunits list download failed', 'epics', 'epics')
                )))
        );

export const fetchIdolsListEpic = action$ =>
    action$.ofType(IDOLS_LIST_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/idollist')
                .map((response: Idol[]) => response.map(item => new Idol(item)))
                .map(idols => idolsListFetchFulfilled(idols))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Idols list download failed', 'epics', 'epics')
                )))
        );

export const fetchSurveysEpic = action$ =>
    action$.ofType(SURVEYS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/allsurveys')
                .map((response: Survey[]) => response.map(item => new Survey(item)))
                .map(surveys => surveysFetchFulfilled(surveys))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Surveys download failed', 'epics', 'epics')
                )))
        );

export const fetchResponsesEpic = action$ =>
    action$.ofType(RESPONSES_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/responses/${action.id}`)
                .map((response: Response[]) => response.map(item => new Response(item)))
                .map(responses => responsesFetchFulfilled(responses))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Responses download failed', 'epics', 'epics')
                )))
        );

export const fetchResponsesByCardEpic = action$ =>
    action$.ofType(RESPONSES_BYCARD_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/surveysbycard/${action.id}`)
                .map((response: ResponseByCard[]) => response.map(item => new ResponseByCard(item)))
                .map(responses => responsesByCardFetchFulfilled(responses))
                .catch(error => Observable.of(
                    setNotification(Notification.error('Responses download failed', 'epics', 'epics')
                )))
        );