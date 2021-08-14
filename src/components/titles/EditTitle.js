import React, {useState} from 'react';
import { createPortal } from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const EditTitle = (props) => {
  if (!props.isShowing) {
    return null;
  }

  const { dog, title } = props;
  const { id } = title;
  const dogId = dog.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [venue, setVenue] = useState(title.venue);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState(title.name);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dateReceived, setDateReceived] = useState(title.dateReceived);

  return props.isShowing && createPortal (
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <table className='name-table'>
              <th
                style={{fontWeight: "bold", fontSize: "24px", padding: "10px"}}>
                Edit Title
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
                value={name}
                onChange={event => setName(event.target.value)} />
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
                disabled={!venue || !name}
                onClick={() => {
                  props.hide();
                  props.onEditPressed({dogId, id, venue, name, dateReceived});
                  setVenue('');
                  setName('');
                  setDateReceived('');
                }}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default EditTitle;
