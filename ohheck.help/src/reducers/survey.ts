import { Survey } from 'types/admin';
import { ISurveyStore } from 'types/redux';
import {
    FETCH_SURVEY,
    FETCH_SURVEY_FULFILLED,
    SET_CARD,
    SET_CHOICE,
    DISPLAY_CARD,
    SUBMIT_SURVEY,
    SUBMIT_SURVEY_FULFILLED
} from 'constants/survey';

const SurveyInitial: ISurveyStore = {
    survey: null,
    loading: true,
    choices: {},
    cards: {},
    error: false,
    message: '',
    displayedcards: [],
    submitting: false,
    aki: '# Aki the Home Page\n\n## hello, yes, this is kevin\n\nyou, too, can do this\n\n<center>centered?</center>'
};

export const survey = (state = SurveyInitial, action): ISurveyStore => {
    switch (action.type) {
        case FETCH_SURVEY:
            return {
                ...state,
                loading: true
            };
        case FETCH_SURVEY_FULFILLED:
            return {
                ...state,
                loading: false,
                survey: action.survey
            };
        case SET_CHOICE:
            return {
                ...state,
                choices: {
                    ...state.choices,
                    [action.name]: action.value
                }
            };
        case SET_CARD:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [action.id]: action.status
                }
            };
        case DISPLAY_CARD:
            return {
                ...state,
                displayedcards: [
                    ...state.displayedcards,
                    action.card
                ]
            };
        case SUBMIT_SURVEY:
            return {
                ...state,
                submitting: true,
                submitresponse: ''
            };
        case SUBMIT_SURVEY_FULFILLED:
            return {
                ...state,
                submitting: false,
                submitresponse: action.response
            };
        default:
            return state;
    }
}