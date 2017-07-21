import { Survey } from 'types/admin';
import { get, genInner, genEpic } from './utils';
import 'rxjs';

import {
    SURVEY_FETCH,
    NEW_CARDS_FETCH
} from 'constants/surveymgmt';

import {
    surveyFetchFulfilled,
    newCardsFetchFulfilled
} from 'actions/surveymgmt';

export const fetchMgmtSurveyEpic = (action$, state) =>
    action$.ofType(SURVEY_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/survey/${action.id}`, surveyFetchFulfilled, 'Survey download failed'));

export const fetchPossibleCardsEpic = (action$, state) =>
    action$.ofType(NEW_CARDS_FETCH).mergeMap(action =>
        genInner(action, state, `/admin/cardlist?filter=${action.filtertype}&id=${action.id}`, newCardsFetchFulfilled, 'Cards download failed'));