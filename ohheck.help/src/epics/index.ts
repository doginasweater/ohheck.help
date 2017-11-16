import { combineEpics } from 'redux-observable';

import {
    fetchAkiPageEpic,
    fetchSurveyEpic,
    submitSurveyEpic
} from './survey';

import {
    fetchCardEpic,
    fetchCardsEpic,
    fetchGroupsEpic,
    fetchGroupsListEpic,
    fetchIdolEpic,
    fetchIdolsEpic,
    fetchIdolsListEpic,
    fetchResponsesByCardEpic,
    fetchResponsesEpic,
    fetchSettingsEpic,
    fetchSubunitEpic,
    fetchSubunitsEpic,
    fetchSubunitsListEpic,
    fetchSurveysEpic,
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
    submitSettingEpic,
    fetchAkiPageEpic
);
