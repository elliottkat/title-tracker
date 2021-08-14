import React, {useState} from 'react';
import { createPortal } from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const AddEditDog = (props) => {
  const { dog } = props;
  const { createdAt } = dog;
  const updatedAt = new Date();
  const id = dog.id || '';
  const [name, setName] = useState(dog.name);
  const [breed, setBreed] = useState(dog.breed);
  const [birthdate, setBirthdate] = useState(dog.birthdate);
  const [sex, setSex] = useState(dog.sex);

  return props.isShowing && createPortal (
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <table className='name-table'>
              <th
                style={{fontWeight: "bold", fontSize: "24px", padding: "10px"}}>
                {dog.id ? `Edit ${dog.name}` : 'Add Dog'}
                <button
                  className='header-button'
                  aria-label='Close'
                  onClick={props.hide}>
                  <text style={{fontWeight: 'bold', fontSize: '20px'}}>
                    <FontAwesomeIcon icon={faTimes} />
                  </text>
                </button>
              </th>
            </table>
            <hr />
            <div>
              <h4>Name</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={name}
                onChange={event => setName(event.target.value)} />
            </div>
            <div>
              <h4>Breed</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={breed}
                onChange={event => setBreed(event.target.value)} />
            </div>
            <div>
              <h4>Birthdate</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={birthdate}
                onChange={event => setBirthdate(event.target.value)} />
            </div>
            <div>
              <h4>Sex</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={sex}
                onChange={event => setSex(event.target.value)} />
            </div>
            <div>
              <button
                className="dog-action-button"
                disabled = {!name || !breed || !birthdate || !sex}
                onClick={() => {
                  props.hide();
                  props.onAddEditPressed({id, name, breed, birthdate, sex, createdAt, updatedAt});
                  setName('');
                  setBreed('');
                  setBirthdate('');
                  setSex('');
                }}>
                {dog.id ? 'Edit' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default AddEditDog;
