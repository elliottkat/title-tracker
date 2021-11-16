import {CommonFetchBlob} from '../CommonTypes';

export interface TitleState {
    allTitles: CommonFetchBlob<Title[]>;
}

export interface Title {
    id?: string;
    dogId: string,
    name: string;
    venue: string;
    dateReceived: string;
    createdAt?: Date;
    updatedAt?: Date;
}