import React, { FC } from 'react';
import { Box } from 'grommet';

import './App.css';

import { DogTable } from './components/Dogs/DogTable';
import { Header } from './components/Dogs/Header';

export const App: FC = () => (
    <Box className="App">
        <Header />
        <DogTable />
    </Box>
);
