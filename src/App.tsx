import React, { FC } from 'react';

import './App.css';

import { DogTable } from './components/dogs/DogTable';
import { Header } from './components/dogs/Header';

export const App: FC = () => (
    <div className="App">
        <Header />
        <DogTable />
    </div>
);
