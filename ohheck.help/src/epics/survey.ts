import { FETCH_SURVEY, SUBMIT_SURVEY } from 'constants/survey';

import {
    fetchSurvey,
    fetchSurveyFulfilled,
    submitSurvey,
    submitSurveyFulfilled
} from 'actions/survey';

import { ajax } from 'rxjs/observable/dom/ajax';
import { Survey } from 'types/admin';
import 'rxjs';

export const fetchSurveyEpic = action$ =>
    action$.ofType(FETCH_SURVEY)
        .mergeMap(action =>
            ajax.getJSON(`/api/survey/${action.slug}`)
                .map(response => new Survey(response))
                .map(survey => fetchSurveyFulfilled(survey))
        );

export const submitSurveyEpic = action$ =>
    action$.ofType(SUBMIT_SURVEY)
        .mergeMap(action =>
            ajax.post('/api/submit', action.submission, { 'Content-Type': 'application/json' })
                .map(response => {
                    const result = JSON.parse(response.responseText);

                    submitSurveyFulfilled({ success: result.success, message: result.message });
                }));