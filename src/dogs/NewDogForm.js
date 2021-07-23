import {useState} from 'react';
import {connect} from 'react-redux';

import './NewDogForm.scss';
import {addDogRequest} from './thunks';

const NewDogForm = ({dogs, onAddPressed}) => {
  const allDogs = dogs.dogs || dogs;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState('');

  return (
    <div className='new-dog-form'>
        <div>
        <label>Name</label>
        <input
          className='new-dog-input'
          type='text'
          value={name}
          onChange={event => setName(event.target.value)} />
        </div>
        <div>
          <label>Birthdate</label>
          <input
            className='new-dog-input'
            type='text'
            value={birthdate}
            onChange={event => setBirthdate(event.target.value)} />
        </div>
        <div>
          <label>Sex</label>
          <input
            className='new-dog-input'
            type='text'
            value={sex}
            onChange={event => setSex(event.target.value)} />
      </div>
      <div>
        <button
          className="new-dog-button"
          onClick={() => {
            const isDuplicateName =
              allDogs.some(dog => dog.name === name);
            if (!isDuplicateName) {
              onAddPressed({name: name, birthdate: birthdate, sex: sex});
              setName('');
              setBirthdate('');
              setSex('');
            }
          }}>
        Add Dog
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  dogs: state.dogs
});

const mapDispatchToProps = dispatch => ({
  onAddPressed: dog => dispatch(addDogRequest(dog))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDogForm);
