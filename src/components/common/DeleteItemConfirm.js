import React from 'react';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faWindowClose} from '@fortawesome/free-solid-svg-icons';

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
            <table className='name-table'>
              <th
                style={{fontWeight: "bold", fontSize: "24px", padding: "10px"}}>
                Delete {deleteTitle}
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
              <button
                className='dog-action-button'
                onClick={() => {
                  props.hide();
                  props.onRemovePressed(item);
                }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default DeleteItemConfirm;
