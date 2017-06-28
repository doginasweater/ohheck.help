import { Survey } from '../types/admin';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs';

import {
    SURVEY_FETCH
} from '../constants/surveymgmt';

import {
    surveyFetchFulfilled
} from '../actions/surveymgmt';

export const fetchMgmtSurveyEpic = action$ =>
    action$.ofType(SURVEY_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/survey/${action.id}`)
                .map((response: Survey) => new Survey(response))
                .map(survey => surveyFetchFulfilled(survey))
        );