import { Group, Subunit, Idol, Survey, Response, ResponseByCard } from '../types/admin';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs';

import {
    GROUPS_FETCH,
    SUBUNITS_FETCH,
    IDOLS_FETCH,
    SURVEYS_FETCH,
    RESPONSES_FETCH,
    RESPONSES_BYCARD_FETCH
} from '../constants/admin';

import {
    groupsFetchFulfilled,
    subunitsFetchFulfilled,
    idolsFetchFulfilled,
    surveysFetchFulfilled,
    responsesFetchFulfilled,
    responsesByCardFetchFulfilled
} from '../actions/admin';

export const fetchGroupsEpic = action$ =>
    action$.ofType(GROUPS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/groups')
                .map((response: Group[]) => response.map(item => new Group(item)))
                .map(groups => groupsFetchFulfilled(groups))
        );

export const fetchSubunitsEpic = action$ =>
    action$.ofType(SUBUNITS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/subunits')
                .map((response: Subunit[]) => response.map(item => new Subunit(item)))
                .map(subunits => subunitsFetchFulfilled(subunits))
        );

export const fetchIdolsEpic = action$ =>
    action$.ofType(IDOLS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/idols')
                .map((response: Idol[]) => response.map(item => new Idol(item)))
                .map(idols => idolsFetchFulfilled(idols))
        );

export const fetchSurveysEpic = action$ =>
    action$.ofType(SURVEYS_FETCH)
        .mergeMap(action =>
            ajax.getJSON('/admin/allsurveys')
                .map((response: Survey[]) => response.map(item => new Survey(item)))
                .map(surveys => surveysFetchFulfilled(surveys))
        );

export const fetchResponsesEpic = action$ =>
    action$.ofType(RESPONSES_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/responses/${action.id}`)
                .map((response: Response[]) => response.map(item => new Response(item)))
                .map(responses => responsesFetchFulfilled(responses))
        );

export const fetchResponsesByCardEpic = action$ =>
    action$.ofType(RESPONSES_BYCARD_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/surveysbycard/${action.id}`)
                .map((response: ResponseByCard[]) => response.map(item => new ResponseByCard(item)))
                .map(responses => responsesByCardFetchFulfilled(responses))
        );