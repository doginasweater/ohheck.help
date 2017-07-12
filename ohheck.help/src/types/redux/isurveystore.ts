import { Survey } from 'types/admin';

export interface ISurveyStore {
    survey: Survey | null;
    loading: boolean;
    choices: Map<number, string>;
    cards: Map<number, boolean>;
    error: boolean;
    message: string;
    displayedcards: JSX.Element[];
    submitting: boolean;
    submitresponse?: string;
}