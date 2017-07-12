import { Survey, Question } from 'types/admin';
import { ISurveyMgmt } from 'types/redux';

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

const initialState: ISurveyMgmt = {
    surveyid: -1,
    survey: null,
    surveyloading: true,
    editable: false,
    newsurvey: new Survey({})
};

export function surveymgmt(state = initialState, action) {
    switch (action.type) {
        case SURVEY_FETCH:
            return {
                ...state,
                surveyloading: true,
                surveyid: action.id
            };
        case SURVEY_FETCH_FULFILLED:
            return {
                ...state,
                surveyloading: false,
                editable: false,
                survey: action.survey
            };
        case EDIT_SURVEY_START:
            return {
                ...state,
                editable: true
            };
        case EDIT_SURVEY_END:
            return {
                ...state,
                editable: false
            };
        case NEW_SET_QUESTIONS:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    questions: action.questions
                }
            };
        case NEW_SET_ACTIVE:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    active: action.active
                }
            };
        case NEW_SET_COMMENTS:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    comments: action.comments
                }
            };
        case NEW_SET_NAME:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    name: action.name
                }
            };
        case NEW_SET_SLUG:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    slug: action.slug
                }
            };
        case NEW_SET_TITLE:
            return {
                ...state,
                newsurvey: {
                    ...state.newsurvey,
                    title: action.title
                }
            };
        default:
            return state;
    }
}