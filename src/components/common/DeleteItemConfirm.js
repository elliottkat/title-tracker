import React from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const DeleteItemConfirm = (props) => {
  const { item } = props;
  const { name } = item;
  const venue = item.venue || '';
  const deleteTitle = venue ? `${venue} ${name}` : name;

  return props.isShowing && ReactDOM.createPortal (
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <h4>Delete {deleteTitle}?</h4>
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                  props.onRemovePressed(item);
                }}>
                Delete
              </button>
              <button type="button" className="close-button" data-dismiss="modal" aria-label="Close" onClick={props.hide}>
                <FontAwesomeIcon icon={faWindowClose} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default DeleteItemConfirm;
