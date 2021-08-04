import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogListItem.scss';

import AddEditDog from './AddEditDog';
import useModal from './useModal';
import DeleteDogConfirm from './DeleteDogConfirm';
import DogDetails from './DogDetails';

const DogListItem = (props) => {
  const {dog} = props;
  const {
    isShowing,
    isShowingDetails,
    isShowingDelete,
    toggle,
    toggleDetails,
    toggleDelete
  } = useModal();

  return (
    <tr
      key={dog.id}
      role='row'
      className='table__dog'>

      <td className='table__row'>{dog.name}</td>
      <td className='table__row table__button' onClick={toggleDetails}>
        <button className='action-button' onClick={toggleDetails}>
          <FontAwesomeIcon icon={faInfoCircle}/>
        </button>
        <DogDetails dog={dog} isShowing={isShowingDetails} hide={toggleDetails} />
      </td>
      <td className='table__row table__button'>
        <button className='action-button' onClick={toggle}>
          <FontAwesomeIcon icon={faEdit}/>
        </button>
        <AddEditDog dog={dog} isShowing={isShowing} hide={toggle} onAddEditPressed={props.onEditPressed} />
      </td>
      <td className='table__row table__button'>
        <button className='action-button' onClick={toggleDelete}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </button>
        <DeleteDogConfirm dog={dog} isShowing={isShowingDelete} hide={toggleDelete} onRemovePressed={props.onRemovePressed} />
      </td>
    </tr>
  )
};

export default DogListItem;