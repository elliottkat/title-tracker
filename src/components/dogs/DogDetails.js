import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import '../../scss/DogActionButtons.scss';
import '../../scss/DogDetails.scss';

const DogDetails = (props) => {
  const [titles, setTitles] = useState([]);
  const {name, id, birthdate, sex} = props.dog;

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await fetch(`http://localhost:8080/titles`, {
        headers: {
          'Content-Type': 'application/json'
        },
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
        <td className='table-data'>{title.venue}</td>
        <td className='table-data'>{title.title}</td>
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
            </div>
          </div>
        </div>
      </div>
    </>, document.body
  );
};

export default DogDetails;
