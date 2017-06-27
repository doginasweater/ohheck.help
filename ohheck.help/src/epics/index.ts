import { combineEpics } from 'redux-observable';
import { fetchSurveyEpic } from './survey';
import {
    fetchGroupsEpic,
    fetchSubunitsEpic,
    fetchIdolsEpic,
    fetchSurveysEpic,
    fetchResponsesEpic
} from './admin';

export const rootEpic = combineEpics(
    fetchGroupsEpic,
    fetchSubunitsEpic,
    fetchIdolsEpic,
    fetchSurveysEpic,
    fetchResponsesEpic,
    fetchSurveyEpic
);