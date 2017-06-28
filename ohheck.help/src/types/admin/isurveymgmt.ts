import { Survey } from '.';

export interface ISurveyMgmt {
    surveyid: number;
    survey?: Survey;
    surveyloading: boolean;
    editable: boolean;
    newsurvey?: Survey;
}