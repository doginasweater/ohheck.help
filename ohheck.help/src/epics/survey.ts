import { FETCH_AKI_PAGE, FETCH_SURVEY, SUBMIT_SURVEY } from 'constants/survey';

import {
    fetchAkiPageFulfilled,
    fetchSurvey,
    fetchSurveyFulfilled,
    submitSurvey,
    submitSurveyFulfilled
} from 'actions/survey';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Survey } from 'types/admin';
import { get, IserverResp, post } from './utils';

export const fetchSurveyEpic = action$ =>
    action$.ofType(FETCH_SURVEY)
        .mergeMap(action =>
            ajax.getJSON(`/api/survey/${action.slug}`)
                .map(response => new Survey(response))
                .map(survey => fetchSurveyFulfilled(survey)));

export const fetchAkiPageEpic = action$ =>
    action$.ofType(FETCH_AKI_PAGE)
        .mergeMap(action =>
            get<IserverResp>('/api/akipage')
                .map(resp => fetchAkiPageFulfilled(resp.success, resp.message, resp.data ? resp.data : ''))
                .catch(err => Observable.of(fetchAkiPageFulfilled(false, 'A server error occurred', ''))));

export const submitSurveyEpic = (action$, state) =>
    action$.ofType(SUBMIT_SURVEY)
        .mergeMap(action =>
            post<IserverResp>('/api/submit', action.submission, state.getState().admin.bearer)
                .map(resp => submitSurveyFulfilled(resp.success, resp.message))
                .catch(err => Observable.of(submitSurveyFulfilled(false, 'A server error occurred.'))));
