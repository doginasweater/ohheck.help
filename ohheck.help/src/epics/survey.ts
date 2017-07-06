import { FETCH_SURVEY } from 'constants/survey';
import { fetchSurvey, fetchSurveyFulfilled } from 'actions/survey';
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