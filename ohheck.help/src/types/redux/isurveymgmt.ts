import { Survey } from 'types/admin';

export interface ISurveyMgmt {
    surveyid: number;
    survey: Survey | null;
    surveyloading: boolean;
    editable: boolean;
    newsurvey: Survey;
}