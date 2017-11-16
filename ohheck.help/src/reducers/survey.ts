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
import { Survey } from 'types/admin';
import { ISurveyStore } from 'types/redux';

const SurveyInitial: ISurveyStore = {
    survey: null,
    loading: true,
    choices: {},
    cards: {},
    error: false,
    message: '',
    displayedcards: [],
    submitting: false,
    aki: ''
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
                    [action.name]: {
                        choice: action.value
                    }
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
        case SET_SELECTION:
            const choicesmaybe = state.choices[action.questionid] ? { ...state.choices[action.questionid].selections } : {};

            return {
                ...state,
                choices: {
                    ...state.choices,
                    [action.questionid]: {
                        selections: {
                            ...choicesmaybe,
                            [action.answerid]: action.value
                        }
                    }
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
                submitresponse: action.message,
                submitsuccess: action.success
            };
        case SET_SURVEY_ERROR:
            return {
                ...state,
                submitresponse: action.error
            };
        case CLEAR_SURVEY_ERROR:
            return {
                ...state,
                submitresponse: ''
            };
        case FETCH_AKI_PAGE:
            return {
                ...state,
                loading: true
            };
        case FETCH_AKI_PAGE_FULFILLED:
            return {
                ...state,
                loading: false,
                error: action.error,
                aki: action.data
            };
        default:
            return state;
    }
};
