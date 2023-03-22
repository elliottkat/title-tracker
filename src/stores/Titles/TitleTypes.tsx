import { CommonFetchBlob } from '../CommonTypes';

export interface TitleState {
    titles: CommonFetchBlob<Title[]>;
    selectedTitle?: Title;
}

export interface Title {
    id?: string;
    dogId: string;
    name: string;
    venue: string;
    dateReceived: string;
    createdAt?: Date;
    updatedAt?: Date;
}
