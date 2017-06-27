import { FETCH_SURVEY } from '../constants/survey';
import { fetchSurvey, fetchSurveyFulfilled } from '../actions/survey';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs';

export const fetchSurveyEpic = action$ =>
    action$.ofType(FETCH_SURVEY)
        .mergeMap(action =>
            ajax.getJSON(`/api/survey/${action.slug}`)
                .map(response => fetchSurveyFulfilled(response))
        );