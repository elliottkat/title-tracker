import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

const AddEditDog = ({dog, isShowing, hide, onAddEditPressed}) => {
  const id = dog.id || '';
  const [name, setName] = useState(dog.name);
  const [birthdate, setBirthdate] = useState(dog.birthdate);
  const [sex, setSex] = useState(dog.sex);

  return isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='add-edit-dog-form'>
            <div>
              <label>Name</label>
              <input
                className='add-edit-dog-input'
                type='text'
                value={name}
                onChange={event => setName(event.target.value)} />
            </div>
            <div>
              <label>Birthdate</label>
              <input
                className='add-edit-dog-input'
                type='text'
                value={birthdate}
                onChange={event => setBirthdate(event.target.value)} />
            </div>
            <div>
              <label>Sex</label>
              <input
                className='add-edit-dog-input'
                type='text'
                value={sex}
                onChange={event => setSex(event.target.value)} />
            </div>
          </div>
          <div>
            <button
              className="add-edit-dog-button"
              onClick={() => {
                hide();
                onAddEditPressed({id: id, name: name, birthdate: birthdate, sex: sex});
                setName('');
                setBirthdate('');
                setSex('');
              }}>
              {dog.id ? 'Edit Dog' : 'Add Dog'}
            </button>
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default AddEditDog;
