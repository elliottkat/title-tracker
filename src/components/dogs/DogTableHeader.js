import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogTable.scss';

import AddEditDog from './AddEditDog';
import useModal from '../../utils/useModal';

const DogTableHeader = (props) => {
  const {isShowing, toggleAddEditDog} = useModal();

  return (
    <table
      id='dog-table-header'
      role='presentation'
      className='table table--fixed'
    >
      <thead>
      <tr role='row'>
        <th role='columnheader' className='table__header'>
          <button className='add-dog-button' onClick={toggleAddEditDog}>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
          <AddEditDog
            dog={{}}
            isShowing={isShowing}
            hide={toggleAddEditDog}
            onAddEditPressed={props.onAddPressed}
            triggerAddEdit={!isShowing}/>
        </th>
      </tr>
      </thead>
    </table>
  )
};

export default DogTableHeader;
