import { CommonFetchBlob } from '../CommonTypes';

export interface DogState {
    allDogs: CommonFetchBlob<Dog[]>;
}

export interface Dog {
    id?: string;
    name: string;
    breed: string;
    birthdate: string;
    sex: string;
    createdAt?: Date;
    updatedAt?: Date;
}
