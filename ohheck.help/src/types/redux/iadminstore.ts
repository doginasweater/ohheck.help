﻿import { Group, Subunit, Survey, ResponseByCard, Notification } from 'types/admin';
import { Card, Idol } from 'types/commontypes';

export interface IAdminStore {
    bearer: string;
    loginvalid?: Date;
    error: boolean;
    errorMessage: string;
    groups: Group[] | null;
    groupslight: Group[];
    groupsloading: boolean;
    subunits: Subunit[] | null;
    subunitslight: Subunit[];
    subunitsloading: boolean;
    idols: Idol[] | null;
    idolslight: Idol[];
    idolsloading: boolean;
    surveys: Survey[] | null;
    surveysloading: boolean;
    surveyid: number;
    responses: Response[] | null;
    responsesloading: boolean;
    responsesbycard: ResponseByCard[] | null;
    responsesbycardloading: boolean;
    notifications: Notification[];
    cardsloading: boolean;
    cards: Card[] | null;
    skip: number;
    take: number;
    fullcards: Card[] | null;
    cardloading: boolean;
}