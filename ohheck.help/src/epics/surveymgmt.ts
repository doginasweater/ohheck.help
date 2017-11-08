import { Survey } from 'types/admin';
import { get, genInner, genEpic } from './utils';
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

export const fetchMgmtSurveyEpic = (action$, state) =>
    action$.ofType(SURVEY_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/survey/${action.id}`, surveyFetchFulfilled, 'Survey download failed'));

export const fetchPossibleCardsEpic = (action$, state) =>
    action$.ofType(NEW_CARDS_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/cardlist?filter=${action.filtertype}&id=${action.id}`, newCardsFetchFulfilled, 'Cards download failed'));

export const saveSurveyEpic = (action$, state) =>
    action$.ofType(SAVE_SURVEY).mergeMap(action =>
        ajax.post('/admin/savesurvey', action.survey, { 'Content-Type': 'application/json', 'Authorization': `bearer ${state.getState().admin.bearer}` })
            .map(response => {
                const result = JSON.parse(response.responseText);

                saveSurveyFulfilled(result.success, result.message);
            }));