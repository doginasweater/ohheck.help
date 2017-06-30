import { Survey } from '.';

export interface ISurveyMgmt {
    surveyid: number;
    survey: Survey | null;
    surveyloading: boolean;
    editable: boolean;
    newsurvey: Survey;
}