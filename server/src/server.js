import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';

let dogs = [
    {
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
    }
];

let titles = [
    {
        id: 'e77c8552-f522-11eb-9a03-0242ac130003',
        name: 'Pi',
        dogId: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
        venue: 'USDAA',
        title: 'Advanced Standard'
    }, {
        id: '9ef5d20a-f53d-11eb-9a03-0242ac130003',
        name: 'Pi',
        dogId: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
        venue: 'USDAA',
        title: 'Starters Jumpers'
    }, {
        id: 'ac33b2de-f53d-11eb-9a03-0242ac130003',
        name: 'Pi',
        dogId: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
        venue: 'AKC',
        title: 'Open JWW'
    }, {
        id: 'd8c776a0-f53d-11eb-9a03-0242ac130003',
        name: 'Petey',
        dogId: '3533f3e0-ea36-11eb-9a03-0242ac130003',
        venue: 'AKC',
        title: 'MACH'
    }, {
        id: 'ea657b28-f53d-11eb-9a03-0242ac130003',
        name: 'Petey',
        dogId: '3533f3e0-ea36-11eb-9a03-0242ac130003',
        venue: 'USDAA',
        title: 'ADCH'
    }, {
        id: '00fd5478-f53e-11eb-9a03-0242ac130003',
        name: 'Whim',
        dogId: '3c96cfea-ea36-11eb-9a03-0242ac130003',
        venue: 'USDAA',
        title: 'ADCH Bronze'
    }, {
        id: '09c770a2-f53e-11eb-9a03-0242ac130003',
        name: 'Whim',
        dogId: '3c96cfea-ea36-11eb-9a03-0242ac130003',
        venue: 'AKC',
        title: 'MACH'
    }
];

const app = express();

app.use(bodyParser.json());
app.use(cors());

//
// DOGS
//
// The route to get the list of all dogs
app.get('/dogs', (req, res) => {
    res.status(200).json(dogs);
});

// The route to get a specific dog
app.get('/dogs/:id', (req, res) => {
    const { id } = req.params;
    const dog = dogs.find(dog => dog.id === id);
    res.status(200).json(dog);
});

// The route to get the list of all dogs, but with a delay
// (to display the loading component better)
app.get('/dogs-delay', (req, res) => {
    setTimeout(() => res.status(200).json(dogs), 2000);
});

// The route to create a new dog
app.post('/dogs', (req, res) => {
    const { name, birthdate, sex } = req.body;
    if (name && birthdate && sex) {
        const newDog = {
            id: uuid(),
            name,
            birthdate,
            sex
        };

        dogs.push(newDog);
        res.status(200).json(newDog);
    } else {
        res.status(400).json({ message: 'Name, birthdate, and sex are required.' });
    }
});

// The route to edit a dog
app.post('/dogs/:id', (req, res) => {
    const { id, name, birthdate, sex } = req.body;
    if (name && birthdate && sex) {
        const editedDog = {
            id,
            name,
            birthdate,
            sex
        };

        dogs = dogs.map(dog => {
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

// The route to delete a dog
app.delete('/dogs/:id', (req, res) => {
    const { id } = req.params;
    const removedDog = dogs.find(dog => dog.id === id);
    dogs = dogs.filter(dog => dog.id !== id);
    res.status(200).json(removedDog);
});

//
// TITLES
//
// The route to get the list of all titles
app.get('/titles', (req, res) => {
    res.status(200).json(titles);
});

// The route to get the list of titles for a specific dog
app.post('/titles/:dogId', (req, res) => {
    const { dogId } = req.body;
    const dogTitles = titles.filter(title => title.dogId === dogId);
    res.status(200).json(dogTitles);
});

// The route to add a title
app.post('/titles', (req, res) => {
    const { dogId, name, venue, title } = req.body;
    if (dogId && name && venue && title) {
        const newTitle = {
            id: uuid(),
            name,
            dogId,
            venue,
            title
        };
        titles.push(newTitle);
        res.status(200).json(newTitle);
    } else {
        res.status(400).json({ message: 'Dog Name, Dog ID, Venue and Title are required.'});
    }
});

// The route to delete a title
app.delete('/titles/:id', (req, res) => {
    const { id } = req.params;
    const removedTitle = titles.find(title => title.id === id);
    titles = titles.filter(title => title.id !== id);
    res.status(200).json(removedTitle);
})

app.listen(8080, () => console.log("Server listening on port 8080"));
