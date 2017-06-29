import {
    SURVEY_FETCH,
    SURVEY_FETCH_FULFILLED,
    EDIT_SURVEY_START,
    EDIT_SURVEY_END,
    NEW_SET_ACTIVE,
    NEW_SET_COMMENTS,
    NEW_SET_NAME,
    NEW_SET_SLUG,
    NEW_SET_TITLE,
    NEW_SET_QUESTIONS
} from '../constants/surveymgmt';

export const surveyFetch = id => ({ type: SURVEY_FETCH, id });
export const surveyFetchFulfilled = survey => ({ type: SURVEY_FETCH_FULFILLED, survey });

export const editSurvey = () => ({ type: EDIT_SURVEY_START });
export const editSurveyStop = () => ({ type: EDIT_SURVEY_END });

export const newSetActive = (active: boolean) => ({ type: NEW_SET_ACTIVE, active });
export const newSetComments = (comments: string) => ({ type: NEW_SET_COMMENTS, comments });
export const newSetName = (name: string) => ({ type: NEW_SET_NAME, name });
export const newSetSlug = (slug: string) => ({ type: NEW_SET_SLUG, slug });
export const newSetTitle = (title: string) => ({ type: NEW_SET_TITLE, title });
export const newSetQuestions = questions => ({ type: NEW_SET_QUESTIONS, questions });