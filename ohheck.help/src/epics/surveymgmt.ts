import { Survey } from 'types/admin';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs';

import {
    SURVEY_FETCH
} from 'constants/surveymgmt';

import {
    surveyFetchFulfilled
} from 'actions/surveymgmt';

const makeHeaders = state => ({
    'Authorization': `bearer ${state.getState().admin.bearer}`
});

export const fetchMgmtSurveyEpic = (action$, state) =>
    action$.ofType(SURVEY_FETCH)
        .mergeMap(action =>
            ajax.getJSON(`/admin/survey/${action.id}`, makeHeaders(state))
                .map((response: Survey) => new Survey(response))
                .map(survey => surveyFetchFulfilled(survey))
        );