import { FetchSuccessPayload } from './CommonTypes';
import {Dog} from './Dogs/DogTypes';
import {Title} from './Titles/TitleTypes';

// Dogs
export const fetchDogs = async (): Promise<FetchSuccessPayload<string>> => {
    const response = await fetch('http://localhost:8080/api/dogs');
    return await response.json();
};

export const fetchDog = async (dog: Dog): Promise<FetchSuccessPayload<string>> => {
    const response = await fetch(`http://localhost:8080/api/dogs/${dog.id}`);
    return await response.json();
};

export const addDog = async (dog: Dog): Promise<any> => {
    const body = JSON.stringify(dog);
    console.log('body:', body);
    const response = await fetch('http://localhost:8080/api/dogs', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body
    });
    return await response.json();
};

export const editDog = async (dog: Dog): Promise<any> => {
    const body = JSON.stringify(dog);
    await fetch(`http://localhost:8080/api/dogs/${dog.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body
    });
    return dog;
};

export const removeDog = async (id: string): Promise<any> => {
    await fetch(`http://localhost:8080/api/dogs/${id}`, {
        method: 'DELETE'
    });
    return id;
};

// Titles
export const fetchTitles = async (id: string): Promise<FetchSuccessPayload<string>> => {
    try {
        const response = await fetch(`http://localhost:8080/api/titles/?dogId=${id}`);
        return await response.json();
    } catch (error) {
        // @ts-ignore
        return error;
    }
};

export const addTitle = async (title: Title): Promise<any> => {
    const body = JSON.stringify(title);
    const response = await fetch('http://localhost:8080/api/titles', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body
    });
    return await response.json();
};

export const editTitle = async (title: Title): Promise<any> => {
    const body = JSON.stringify(title);
    await fetch(`http://localhost:8080/api/titles/${title.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body
    });
    return title
};

export const removeTitle = async (id: string): Promise<any> => {
    await fetch(`http://localhost:8080/api/titles/${id}`, {
        method: 'DELETE'
    });
    return id;
};
