import { Survey } from 'types/admin';

export interface ISurveyStore {
    survey: Survey | null;
    loading: boolean;
    choices: any;
    cards: any;
    error: boolean;
    message: string;
    displayedcards: JSX.Element[];
}