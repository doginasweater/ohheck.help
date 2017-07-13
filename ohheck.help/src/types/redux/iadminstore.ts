import { Group, Subunit, Survey, ResponseByCard, Notification } from 'types/admin';
import { Idol } from 'types/commontypes';

export interface IAdminStore {
    error: boolean;
    errorMessage: string;
    authenticated: boolean;
    groups: Group[] | null;
    groupsloading: boolean;
    subunits: Subunit[] | null;
    subunitsloading: boolean;
    idols: Idol[] | null;
    idolsloading: boolean;
    surveys: Survey[] | null;
    surveysloading: boolean;
    surveyid: number;
    responses: Response[] | null;
    responsesloading: boolean;
    responsesbycard: ResponseByCard[] | null;
    responsesbycardloading: boolean;
    notifications: Notification[];
}