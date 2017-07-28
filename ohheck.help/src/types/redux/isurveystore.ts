import { Survey } from 'types/admin';

export interface ISurveyStore {
    survey: Survey | null;
    loading: boolean;
    choices: { [id: number]: string; };
    cards: { [id: number]: boolean; };
    error: boolean;
    message: string;
    displayedcards: JSX.Element[];
    submitting: boolean;
    submitresponse?: string;
    aki: string;
}