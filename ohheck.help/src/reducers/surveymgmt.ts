import { Survey, Question, Answer } from 'types/admin';
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
    NEW_SET_QUESTIONS,
    NEW_SET_CARD_FILTER,
    NEW_CARDS_FETCH,
    NEW_CARDS_FETCH_FULFILLED,
    NEW_SELECT_CARD,
    NEW_UNSELECT_CARD,
    SAVE_SURVEY,
    SAVE_SURVEY_FULFILLED
} from 'constants/surveymgmt';

const initialState: ISurveyMgmt = {
    surveyid: -1,
    survey: null,
    surveyloading: true,
    editable: false,
    newsurvey: new Survey({}),
    cardfilter: '',
    cardfiltertype: '',
    cardsloading: false,
    cards: [],
    selectedcards: []
};

export const surveymgmt = (state = initialState, action): ISurveyMgmt => {
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
        case NEW_SET_CARD_FILTER:
            return {
                ...state,
                cardfilter: action.filter,
                cardfiltertype: action.filtertype
            };
        case NEW_CARDS_FETCH:
            return {
                ...state,
                cardsloading: true
            };
        case NEW_CARDS_FETCH_FULFILLED:
            return {
                ...state,
                cardsloading: false,
                cards: action.cards
            };
        case NEW_SELECT_CARD:
            const card = state.cards.find(item => item.id === action.id);
            let newState = {
                ...state,
                cards: [
                    ...state.cards.filter(item => item.id !== action.id)
                ]
            };

            if (card) {
                newState.selectedcards = [
                    ...state.selectedcards,
                    card
                ];

                let q = newState.newsurvey.questions[action.index];

                if (q.answers.length === 0) {
                    q.answers.push(new Answer({ cards: [] }));
                }

                newState.newsurvey.questions[action.index].answers[0].cards = [
                    ...q.answers[0].cards!,
                    card
                ];
            }

            return newState;
        case NEW_UNSELECT_CARD:
            const selectedcard = state.selectedcards.find(item => item.id === action.id);
            let newUnselectState = {
                ...state,
                selectedcards: [
                    ...state.selectedcards.filter(item => item.id !== action.id)
                ]
            };

            if (selectedcard) {
                newUnselectState.cards = [
                    ...state.cards,
                    selectedcard
                ];

                newUnselectState.newsurvey.questions[action.index].answers[0].cards =
                    newUnselectState.newsurvey.questions[action.index].answers[0].cards!.filter(item => item.id !== action.id);
            }

            return newUnselectState;
        case SAVE_SURVEY:
            return {
                ...state,
                surveyloading: true
            };
        case SAVE_SURVEY_FULFILLED:
            return {
                ...state,
                surveyloading: false
            };
        default:
            return state;
    }
}