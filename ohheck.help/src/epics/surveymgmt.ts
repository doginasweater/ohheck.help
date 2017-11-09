import { Survey } from 'types/admin';
import { get, genInner, genEpic, post, serverResp } from './utils';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs';

import {
    SURVEY_FETCH,
    NEW_CARDS_FETCH,
    SAVE_SURVEY
} from 'constants/surveymgmt';

import {
    surveyFetchFulfilled,
    newCardsFetchFulfilled,
    saveSurveyFulfilled
} from 'actions/surveymgmt';
import { Observable } from 'rxjs/Observable';

export const fetchMgmtSurveyEpic = (action$, state) =>
    action$.ofType(SURVEY_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/survey/${action.id}`, surveyFetchFulfilled, 'Survey download failed'));

export const fetchPossibleCardsEpic = (action$, state) =>
    action$.ofType(NEW_CARDS_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/cardlist?filter=${action.filtertype}&id=${action.id}`, newCardsFetchFulfilled, 'Cards download failed'));

export const saveSurveyEpic = (action$, state) =>
    action$.ofType(SAVE_SURVEY).mergeMap(action =>
        post<serverResp>('/admin/savesurvey', action.survey, state.getState().admin.bearer)
            .map(resp => saveSurveyFulfilled(resp.success, resp.message))
            .catch(err => Observable.of(saveSurveyFulfilled(false, 'A server error occurred.'))));