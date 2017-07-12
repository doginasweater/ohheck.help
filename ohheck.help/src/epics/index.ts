import { combineEpics } from 'redux-observable';

import {
    fetchSurveyEpic,
    submitSurveyEpic
} from './survey';

import {
    fetchGroupsEpic,
    fetchSubunitsEpic,
    fetchIdolsEpic,
    fetchSurveysEpic,
    fetchResponsesEpic,
    fetchResponsesByCardEpic
} from './admin';

import {
    fetchMgmtSurveyEpic
} from './surveymgmt';

export const rootEpic = combineEpics(
    fetchGroupsEpic,
    fetchSubunitsEpic,
    fetchIdolsEpic,
    fetchSurveysEpic,
    fetchResponsesEpic,
    fetchResponsesByCardEpic,
    fetchMgmtSurveyEpic,
    fetchSurveyEpic,
    submitSurveyEpic
);