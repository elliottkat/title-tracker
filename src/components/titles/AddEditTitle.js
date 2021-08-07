import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const AddEditTitle = (props) => {
  if (!props.isShowing) {
    return null;
  }

  const { dog, title } = props;
  const titleId = title.id || '';
  const dogId = dog.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [venue, setVenue] = useState(title.venue);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [titleName, setTitleName] = useState(title.name);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dateReceived, setDateReceived] = useState(title.dateReceived);

  return props.isShowing && ReactDOM.createPortal (
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
                value={titleName}
                onChange={event => setTitleName(event.target.value)} />
            </div>
            <div>
              <h4>Date Received</h4>
              <input
                className='add-edit-dog-input'
                type='text'
                value={dateReceived}
                onChange={event => setDateReceived(event.target.value)} />
            </div>
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                  props.onAddEditPressed({dogId, venue, titleName, dateReceived});
                  setVenue('');
                  setTitleName('');
                  setDateReceived('');
                }}>
                {titleId ? 'Edit' : 'Add'}
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
