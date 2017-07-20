import { combineEpics } from 'redux-observable';

import {
    fetchSurveyEpic,
    submitSurveyEpic
} from './survey';

import {
    fetchGroupsEpic,
    fetchGroupsListEpic,
    fetchSubunitsEpic,
    fetchSubunitsListEpic,
    fetchIdolsEpic,
    fetchIdolsListEpic,
    fetchSurveysEpic,
    fetchResponsesEpic,
    fetchResponsesByCardEpic,
    fetchCardsEpic,
    fetchCardEpic
} from './admin';

import {
    fetchMgmtSurveyEpic
} from './surveymgmt';

export const rootEpic = combineEpics(
    fetchGroupsEpic,
    fetchGroupsListEpic,
    fetchSubunitsEpic,
    fetchSubunitsListEpic,
    fetchIdolsEpic,
    fetchIdolsListEpic,
    fetchSurveysEpic,
    fetchResponsesEpic,
    fetchResponsesByCardEpic,
    fetchMgmtSurveyEpic,
    fetchSurveyEpic,
    fetchCardsEpic,
    fetchCardEpic,
    submitSurveyEpic
);