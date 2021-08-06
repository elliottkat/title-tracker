import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const AddEditTitle = (props) => {
  const { dog } = props;
  const dogId = dog.id || '';
  const [venue, setVenue] = useState('');
  const [title, setTitle] = useState('');

  return props.isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <div>
              <h4>Venue</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={venue}
                onChange={event => setVenue(event.target.value)} />
            </div>
            <div>
              <h4>Title</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={title}
                onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                  props.onAddEditPressed({venue, title});
                  setVenue('');
                  setTitle('');
                }}>
                {dog.id ? 'Edit Title' : 'Add Title'}
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

export default AddEditTitle;
