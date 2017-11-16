import { Survey } from 'types/admin';

export interface ISurveyStore {
    survey: Survey | null;
    loading: boolean;
    choices: {
        [id: number]: {
            choice?: string;
            selections?: { [id: string]: boolean; };
        }
    };
    cards: { [id: number]: boolean; };
    error: boolean;
    message: string;
    displayedcards: JSX.Element[];
    submitting: boolean;
    submitresponse?: string;
    submitsuccess?: boolean;
    aki: string;
}