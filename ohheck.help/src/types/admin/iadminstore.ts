import { Group, Subunit, Idol, Survey, ResponseByCard } from '.';

export interface IAdminStore {
    error: boolean;
    errorMessage: string;
    authenticated: boolean;
    groups?: Group[];
    groupsloading: boolean;
    subunits: Subunit[];
    subunitsloading: boolean;
    idols?: Idol[];
    idolsloading: boolean;
    surveys?: Survey[];
    surveysloading: boolean;
    surveyid: number;
    responses?: Response[];
    responsesloading: boolean;
    responsesbycard?: ResponseByCard[];
    responsesbycardloading: boolean;
}