import { SurveySubmission } from 'types/survey';
import {
    FETCH_SURVEY,
    FETCH_SURVEY_FULFILLED,
    SET_CARD,
    SET_CHOICE,
    DISPLAY_CARD,
    SUBMIT_SURVEY,
    SUBMIT_SURVEY_FULFILLED
} from 'constants/survey';

export const fetchSurvey = (slug: string) => ({ type: FETCH_SURVEY, slug });
export const fetchSurveyFulfilled = survey => ({ type: FETCH_SURVEY_FULFILLED, survey });

export const setCard = (id: number, status: boolean) => ({ type: SET_CARD, id, status });
export const setChoice = (name: string, value: string) => ({ type: SET_CHOICE, name, value });

export const displayCard = (card: JSX.Element) => ({ type: DISPLAY_CARD, card });

export const submitSurvey = (submission: SurveySubmission) => ({ type: SUBMIT_SURVEY, submission });
export const submitSurveyFulfilled = (response: { success: boolean; message: string; }) => ({ type: SUBMIT_SURVEY_FULFILLED, response });