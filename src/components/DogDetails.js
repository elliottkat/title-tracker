import React from 'react';
import ReactDOM from 'react-dom';

import '../../scss/DogActionButtons.scss';

const DogDetails = ({dog, isShowing, hide}) => {
  const {name} = dog;

  return isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <h4>{name}</h4>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Birthdate:</text><text style={{fontSize: '16px'}}> {dog.birthdate}</text></p>
            </div>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Sex:</text><text style={{fontSize: '16px'}}> {dog.sex}</text></p>
            </div>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Titles:</text></p>
            </div>
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  hide();
                }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default DogDetails;
