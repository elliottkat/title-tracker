import React from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogActionButtons.scss';

const DeleteDogConfirm = (props) => {
  const { dog } = props;
  const { name } = dog;

  return props.isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <h4>Delete {name}?</h4>
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                  props.onRemovePressed(dog);
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

export default DeleteDogConfirm;
