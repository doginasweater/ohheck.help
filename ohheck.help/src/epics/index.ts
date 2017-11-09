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
    fetchCardEpic,
    fetchIdolEpic,
    fetchSubunitEpic,
    fetchSettingsEpic,
    submitSettingEpic
} from './admin';

import {
    fetchMgmtSurveyEpic,
    fetchPossibleCardsEpic,
    saveSurveyEpic
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
    fetchPossibleCardsEpic,
    fetchIdolEpic,
    fetchSubunitEpic,
    submitSurveyEpic,
    saveSurveyEpic,
    fetchSettingsEpic,
    submitSettingEpic
);