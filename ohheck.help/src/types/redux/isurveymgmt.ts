import { Survey } from 'types/admin';
import { Card } from 'types/commontypes';

export interface ISurveyMgmt {
    surveyid: number;
    survey: Survey | null;
    surveyloading: boolean;
    editable: boolean;
    newsurvey: Survey;
    cardfilter: string;
    cardfiltertype: 'group' | 'subunit' | 'idol' | 'tag' | '';
    cardsloading: boolean;
    cards: Card[];
    selectedcards: Card[];
    savesuccess?: boolean;
    savemessage?: string;
}