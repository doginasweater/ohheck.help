import {
    FETCH_SURVEY,
    FETCH_SURVEY_FULFILLED,
    SET_CARD,
    SET_CHOICE,
    DISPLAY_CARD
} from 'constants/survey';

export const fetchSurvey = slug => ({ type: FETCH_SURVEY, slug });
export const fetchSurveyFulfilled = survey => ({ type: FETCH_SURVEY_FULFILLED, survey });
export const setCard = (id: number, status: boolean) => ({ type: SET_CARD, id, status });
export const setChoice = (name: string, value: string) => ({ type: SET_CHOICE, name, value });
export const displayCard = (card: JSX.Element) => ({ type: DISPLAY_CARD, card });