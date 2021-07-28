import React from 'react';
import {hot} from 'react-hot-loader';

import './App.css';

import DogList from './components/dogs/DogList';
import Header from './components/dogs/Header';

const App = () => (
  <div className='App'>
    <Header />
    <DogList />
  </div>
);

export default hot(module)(App);
