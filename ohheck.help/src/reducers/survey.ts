import { Survey } from '../types/admin/survey';
import { FETCH_SURVEY, FETCH_SURVEY_FULFILLED } from '../constants/survey';

interface ISurveyStore {
    survey: Survey | null;
    loading: boolean;
    choices: any;
    cards: any;
    error: boolean;
    message: string;
}

const SurveyInitial: ISurveyStore = {
    survey: null,
    loading: true,
    choices: {},
    cards: {},
    error: false,
    message: ''
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
                survey: new Survey(action.survey)
            };
        default:
            return state;
    }
}