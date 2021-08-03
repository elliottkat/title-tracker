import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

const DogDetails = (props) => {
  const {dog} = props;
  console.log(dog);
  return (
    <div>
      <button
        className="close-button"
        onClick={() => {}}>
        <FontAwesomeIcon icon={faWindowClose}/>
      </button>
    </div>
  );
};

export default DogDetails;
