import { Survey } from 'types/admin/survey';
import { ISurveyStore } from 'types/redux';
import {
    FETCH_SURVEY,
    FETCH_SURVEY_FULFILLED,
    SET_CARD,
    SET_CHOICE,
    DISPLAY_CARD
} from 'constants/survey';

const SurveyInitial: ISurveyStore = {
    survey: null,
    loading: true,
    choices: {},
    cards: {},
    error: false,
    message: '',
    displayedcards: []
};

export function survey(state = SurveyInitial, action) {
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
        default:
            return state;
    }
}