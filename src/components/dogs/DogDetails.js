import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';

import '../../scss/DogActionButtons.scss';
import '../../scss/DogDetails.scss';

import {addEditTitleRequest} from '../../thunks/thunks';
import useModal from '../../utils/useModal';
import AddEditTitle from '../titles/AddEditTitle';

const DogDetails = (props) => {
  const {dog} = props;
  const {name, id, birthdate, sex} = props.dog;
  const [titles, setTitles] = useState([]);

  const {
    isShowingAddEditTitle,
    toggleAddEditTitle
  } = useModal();

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await fetch('http://localhost:8080/api/titles', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      const titles = json.filter(title => title.dogId === id);
      setTitles(titles);
    }
    fetchTitles();
  }, []);

  const titleTableInfo = titles.map(title => {
    return (
      <tr>
        <td key={title.id + title.venue} className='table-data'>{title.venue}</td>
        <td key={title.id + title.title} className='table-data'>{title.title}</td>
      </tr>
    );
  });

  const titleTable = (
    <div align='left'>
      <table className='title-table'>
        <caption align='left' style={{'margin-bottom': '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '20px'}}>Titles:</caption>
        <tbody>
        <tr>
          <th className='table-header'>Venue</th>
          <th className='table-header'>Title</th>
        </tr>
        {titleTableInfo}
        </tbody>
      </table>
    </div>
  );

  return props.isShowing && ReactDOM.createPortal(
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <h3>{name}</h3>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Birthdate:</text><text style={{fontSize: '16px'}}> {birthdate}</text></p>
            </div>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Sex:</text><text style={{fontSize: '16px'}}> {sex}</text></p>
            </div>
            {titles.length === 0 ? null : titleTable}
            <p />
            <div>
              <button
                className="dog-action-button"
                onClick={() => {
                  props.hide();
                }}>
                Close
              </button>
              <button
                className="dog-action-button"
                onClick={toggleAddEditTitle}
                >Add Title</button>
              <AddEditTitle dog={dog} isShowing={isShowingAddEditTitle} hide={toggleAddEditTitle} onAddEditPressed={props.onAddEditPressed} />
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

const mapStateToProps = state => ({
  titles: state.titles,
});

const mapDispatchToProps = dispatch => ({
  onAddEditPressed: title => dispatch(addEditTitleRequest(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);
