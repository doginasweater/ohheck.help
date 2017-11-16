import 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Survey } from 'types/admin';
import { genEpic, genInner, get, IserverResp, post } from './utils';

import {
    NEW_CARDS_FETCH,
    SAVE_SURVEY,
    SURVEY_FETCH
} from 'constants/surveymgmt';

import {
    newCardsFetchFulfilled,
    saveSurveyFulfilled,
    surveyFetchFulfilled
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
        post<IserverResp>('/admin/savesurvey', action.survey, state.getState().admin.bearer)
            .map(resp => saveSurveyFulfilled(resp.success, resp.message))
            .catch(err => Observable.of(saveSurveyFulfilled(false, 'A server error occurred.'))));
