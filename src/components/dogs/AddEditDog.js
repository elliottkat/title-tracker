import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const AddEditDog = (props) => {
  const { dog } = props;
  const { createdAt } = dog;
  const updatedAt = new Date();
  const id = dog.id || '';
  const [name, setName] = useState(dog.name);
  const [birthdate, setBirthdate] = useState(dog.birthdate);
  const [sex, setSex] = useState(dog.sex);

  return props.isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <div>
              <h4>Name</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={name}
                onChange={event => setName(event.target.value)} />
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
                onClick={() => {
                  props.hide();
                  props.onAddEditPressed({id, name, birthdate, sex, createdAt, updatedAt});
                  setName('');
                  setBirthdate('');
                  setSex('');
                }}>
                {dog.id ? 'Edit Dog' : 'Add Dog'}
              </button>
              <button type="button" className="action-button" data-dismiss="modal" aria-label="Close" onClick={props.hide}>
                <FontAwesomeIcon icon={faWindowClose} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default AddEditDog;
