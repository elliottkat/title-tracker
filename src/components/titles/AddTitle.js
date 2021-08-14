import React, {useState} from 'react';
import { createPortal } from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const AddTitle = (props) => {
  const { dog } = props;
  const dogId = dog.id;
  const [venue, setVenue] = useState('');
  const [name, setName] = useState('');
  const [dateReceived, setDateReceived] = useState('');

  return props.isShowing && createPortal (
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <table className='name-table'>
              <th
                style={{fontWeight: "bold", fontSize: "24px", padding: "10px"}}>
                Add Title
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
                disabled={!venue || !name}
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                  props.onAddPressed({dogId, venue, name, dateReceived});
                  setVenue('');
                  setName('');
                  setDateReceived('');
                }}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default AddTitle;
