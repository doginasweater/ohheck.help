import { FETCH_SURVEY, FETCH_SURVEY_FULFILLED } from '../constants/survey';

export const fetchSurvey = slug => ({ type: FETCH_SURVEY, slug });
export const fetchSurveyFulfilled = survey => ({ type: FETCH_SURVEY_FULFILLED, survey });