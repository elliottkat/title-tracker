import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogTable.scss';
import NewDogForm from './NewDogForm';

const DogTableHeader = () => (
  <table
    id="dog-table-header"
    role="presentation"
    className="styled-table"
  >
    {/*<NewDogForm />*/}
    <thead>
      <tr>
        <th className='table table__header'>Agility Dog Title Tracker</th>
      </tr>
    </thead>
    {/*<div>*/}
    {/*  <button*/}
    {/*    className="dog-add-button"*/}
    {/*    onClick={() => {}}>*/}
    {/*    <FontAwesomeIcon icon={faPlus} />*/}
    {/*  </button>*/}
    {/*</div>*/}
  </table>
);

export default DogTableHeader;
