import {
    CLEAR_SURVEY_ERROR,
    DISPLAY_CARD,
    FETCH_AKI_PAGE,
    FETCH_AKI_PAGE_FULFILLED,
    FETCH_SURVEY,
    FETCH_SURVEY_FULFILLED,
    SET_CARD,
    SET_CHOICE,
    SET_SELECTION,
    SET_SURVEY_ERROR,
    SUBMIT_SURVEY,
    SUBMIT_SURVEY_FULFILLED
} from 'constants/survey';
import { SurveySubmission } from 'types/survey';

export const fetchSurvey = (slug: string) => ({ type: FETCH_SURVEY, slug });
export const fetchSurveyFulfilled = survey => ({ type: FETCH_SURVEY_FULFILLED, survey });

export const setCard = (id: number, status: boolean) => ({ type: SET_CARD, id, status });
export const setChoice = (name: string, value: string) => ({ type: SET_CHOICE, name, value });
export const setSelection = (questionid: string, answerid: string, value: boolean) => ({ type: SET_SELECTION, questionid, answerid, value });

export const displayCard = (card: JSX.Element) => ({ type: DISPLAY_CARD, card });

export const submitSurvey = (submission: SurveySubmission) => ({ type: SUBMIT_SURVEY, submission });
export const submitSurveyFulfilled = (success: boolean, message: string) => ({ type: SUBMIT_SURVEY_FULFILLED, success, message });

export const setSurveyError = (error: string) => ({ type: SET_SURVEY_ERROR, error });
export const clearSurveyError = () => ({ type: CLEAR_SURVEY_ERROR });

export const fetchAkiPage = () => ({ type: FETCH_AKI_PAGE });
export const fetchAkiPageFulfilled = (success: boolean, error: string, data: string) => ({ type: FETCH_AKI_PAGE_FULFILLED, success, error, data });
