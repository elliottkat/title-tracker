import { Dog } from './Dogs/DogTypes';
import { FetchSuccessPayload } from './CommonTypes';
import { Title } from './Titles/TitleTypes';

const port = 9000;

// Dogs
export const fetchDogs = async (): Promise<FetchSuccessPayload<string>> => {
    const response = await fetch(`http://localhost:${port}/api/dogs`);
    return await response.json();
};

export const fetchDog = async (dog: Dog): Promise<FetchSuccessPayload<string>> => {
    const response = await fetch(`http://localhost:${port}/api/dogs/${dog.id}`);
    return await response.json();
};

export const addDog = async (dog: Dog): Promise<any> => {
    const body = JSON.stringify(dog);
    const response = await fetch(`http://localhost:${port}/api/dogs`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
    });
    return await response.json();
};

export const editDog = async (dog: Dog): Promise<any> => {
    const body = JSON.stringify(dog);
    await fetch(`http://localhost:${port}/api/dogs/${dog.id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
    });
    return dog;
};

export const removeDog = async (id: string): Promise<any> => {
    await fetch(`http://localhost:${port}/api/dogs/${id}`, {
        method: 'DELETE',
    });
    return id;
};

// Titles
export const fetchTitles = async (id: string): Promise<FetchSuccessPayload<string>> => {
    try {
        const response = await fetch(`http://localhost:${port}/api/titles?dogId=${id}`);
        const jsonResponse = await response.json();
        console.log('jsonResponse', jsonResponse);
        return jsonResponse;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return error;
    }
};

export const fetchTitle = async (id: string): Promise<FetchSuccessPayload<string>> => {
    try {
        const response = await fetch(`http://localhost:${port}/api/titles?id=${id}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return error;
    }
};

export const addTitle = async (title: Title): Promise<any> => {
    const body = JSON.stringify(title);
    const response = await fetch(`http://localhost:${port}/api/titles`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
    });

    return await response.json();
};

export const editTitle = async (title: Title): Promise<any> => {
    const body = JSON.stringify(title);
    await fetch(`http://localhost:${port}/api/titles/${title.id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
    });
    return title;
};

export const removeTitle = async (id: string): Promise<any> => {
    await fetch(`http://localhost:${port}/api/titles/${id}`, {
        method: 'DELETE',
    });
    return id;
};
