import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';

let fakeDogs = [{
    id: 'ae06181d-92c2-4fed-a29d-fb53a6301eb9',
    name: 'Rover',
    birthdate: 'March 22, 2016',
    sex: 'M'
}, {
    id: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
    name: 'Pi',
    birthdate: 'October 25, 2016',
    sex: 'M'
}, {
    id: '2e538cc5-b734-4771-a109-dfcd204bb38b',
    name: 'Jilly',
    birthdate: 'December 14, 2014',
    sex: 'F'
}, {
    id: '3f649dd6-c845-4771-a109-dfcd204bb38b',
    name: 'Flapjack',
    birthdate: 'August 1, 2020',
    sex: 'F'
}, {
    id: '3533f3e0-ea36-11eb-9a03-0242ac130003',
    name: 'Petey',
    birthdate: 'June 25, 2013',
    sex: 'M'
}, {
    id: '3c96cfea-ea36-11eb-9a03-0242ac130003',
    name: 'Whim',
    birthdate: 'February 12, 2014',
    sex: 'F'
}];

const app = express();

app.use(bodyParser.json());
app.use(cors());

// The route for getting a list of all dogs
app.get('/dogs', (req, res) => {
    res.status(200).json(fakeDogs);
});

// The route for getting a specific dog
app.get('/dogs/:id', (req, res) => {
    const { id } = req.params;
    const dog = fakeDogs.find(dog => dog.id === id);
    res.status(200).json(dog);
});

// The route for getting a list of all dogs, but with a delay
// (to display the loading component better)
app.get('/dogs-delay', (req, res) => {
    setTimeout(() => res.status(200).json(fakeDogs), 2000);
});

// The route for creating new dog
app.post('/dogs', (req, res) => {
    const { name, birthdate, sex } = req.body;
    if (name && birthdate && sex) {
        const insertedDog = {
            id: uuid(),
            name,
            birthdate,
            sex
        };

        fakeDogs.push(insertedDog);
        res.status(200).json(insertedDog);
    } else {
        res.status(400).json({ message: 'Name, birthdate, and sex are required.' });
    }
});

// The route for editing a dog
app.post('/dogs/:id', (req, res) => {
    const { id, name, birthdate, sex } = req.body;
    if (name && birthdate && sex) {
        const editedDog = {
            id,
            name,
            birthdate,
            sex
        };

        fakeDogs = fakeDogs.map(dog => {
            if (dog.id === id) {
                return editedDog
            } else {
                return dog;
            }
        });
        res.status(200).json(editedDog);
    } else {
        res.status(400).json({ message: 'Name, birthdate, and sex are required.' });
    }
});

// The route for deleting a dog
app.delete('/dogs/:id', (req, res) => {
    const { id } = req.params;
    const removedDog = fakeDogs.find(dog => dog.id === id);
    fakeDogs = fakeDogs.filter(dog => dog.id !== id);
    res.status(200).json(removedDog);
});

app.listen(8080, () => console.log("Server listening on port 8080"));
