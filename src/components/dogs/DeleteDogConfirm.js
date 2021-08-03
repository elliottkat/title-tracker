import React from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DeleteDogConfirm.scss';

const DeleteDogConfirm = ({dog, isShowing, hide, onRemovePressed}) => {
  const {id, name} = dog;

  return isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='delete-dog-form'>
            <h4>Delete {name}?</h4>
            <div>
              <button
                className="delete-dog-button"
                onClick={() => {
                  hide();
                  onRemovePressed(id);
                }}>
                Delete
              </button>
              <button type="button" className="close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <FontAwesomeIcon icon={faWindowClose} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default DeleteDogConfirm;
