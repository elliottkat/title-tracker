import React from 'react';
import {hot} from 'react-hot-loader';
import DogList from './dogs/DogList';
import './App.css';

const App = () => (
  <div className='App'>
    <DogList/>
  </div>
);

export default hot(module)(App);
