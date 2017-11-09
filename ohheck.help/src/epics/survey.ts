import { FETCH_SURVEY, SUBMIT_SURVEY } from 'constants/survey';

import {
    fetchSurvey,
    fetchSurveyFulfilled,
    submitSurvey,
    submitSurveyFulfilled
} from 'actions/survey';

import { post } from './utils';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Survey } from 'types/admin';
import 'rxjs';

type serverResp = {
    success: boolean;
    message: string;
};

export const fetchSurveyEpic = action$ =>
    action$.ofType(FETCH_SURVEY)
        .mergeMap(action =>
            ajax.getJSON(`/api/survey/${action.slug}`)
                .map(response => new Survey(response))
                .map(survey => fetchSurveyFulfilled(survey))
        );

export const submitSurveyEpic = (action$, state) =>
    action$.ofType(SUBMIT_SURVEY)
        .mergeMap(action =>
            post<serverResp>('/api/submit', action.submission, state.getState().admin.bearer)
                .map(resp => submitSurveyFulfilled(resp.success, resp.message))
        );