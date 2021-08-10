import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogDetails.scss';

import {addTitleRequest, loadTitles, removeTitleRequest} from '../../thunks/thunks';
import useModal from '../../utils/useModal';
import AddEditTitle from '../titles/AddEditTitle';
import DeleteItemConfirm from '../common/DeleteItemConfirm';

const DogDetails = (props) => {
  if (!props.isShowing) {
    return null;
  }

  const {dog} = props;
  const titles = props.titles || [];
  const {id, name, breed, birthdate, sex} = props.dog;

  const {
    isShowingAddEditTitle,
    toggleAddEditTitle,
    isShowingDelete,
    toggleDelete
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useModal();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    props.startLoadingTitles(id);
  }, []);

  const titleTableInfo = titles.map(title => {
    return (
      <tr>
        <td key={title.id + title.venue} className='table-data'>{title.venue}</td>
        <td key={title.id + title.name} className='table-data'>{title.name}</td>
        <td key={title.id + title.dateReceived} className='table-data'>{title.dateReceived}</td>
        <td key={title.id + 'edit'} className='table-data'>
          <button
            className="title-action-button"
            onClick={toggleAddEditTitle}
          ><FontAwesomeIcon icon={faEdit}/></button>
          <AddEditTitle
            dog={dog}
            title={title}
            hide={toggleAddEditTitle}
            isShowing={isShowingAddEditTitle}
            onAddEditPressed={props.onAddEditPressed}
          />
        </td>
        <td key={title.id + 'delete'} className='table-data'>
          <td className='table__row table__button'>
            <button className='title-action-button' onClick={toggleDelete}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
            <DeleteItemConfirm item={title} isShowing={isShowingDelete} hide={toggleDelete} onRemovePressed={props.onRemovePressed} />
          </td>
        </td>
      </tr>
    );
  });

  const titleTable = (
    <div align='left'>
      <table className='title-table'>
        <caption align='left' style={{marginBottom: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '20px'}}>Titles:</caption>
        <tbody>
        <tr>
          <th className='table-header' align='left'>Venue</th>
          <th className='table-header' align='left'>Title</th>
          <th className='table-header' align='left'>Date Received</th>
          <th className='table-header'/>
          <th className='table-header'/>
        </tr>
        {titleTableInfo}
        </tbody>
      </table>
    </div>
  );

  return props.isShowing && ReactDOM.createPortal (
    <>
      <div/>
      <div className='modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <h3>{name}</h3>
            <hr />
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Breed:</text><text style={{fontSize: '16px'}}> {breed}</text></p>
            </div>
            <p/>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Birthdate:</text><text style={{fontSize: '16px'}}> {birthdate}</text></p>
            </div>
            <p/>
            <div align='left'>
              <p><text style={{fontWeight: 'bold', fontSize: '20px'}}>Sex:</text><text style={{fontSize: '16px'}}> {sex}</text></p>
            </div>
            {titles.length === 0 ? null : titleTable}
            <p />
            <div>
              <button
                className="dog-action-button"
                onClick={toggleAddEditTitle}
                >Add Title</button>
              <AddEditTitle
                dog={dog}
                title={{}}
                hide={toggleAddEditTitle}
                isShowing={isShowingAddEditTitle}
                onAddEditPressed={props.onAddEditPressed}
              />
              <button type="button" className="action-button" data-dismiss="modal" aria-label="Close" onClick={props.hide}>
                <FontAwesomeIcon icon={faWindowClose} />
              </button>
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
  startLoadingTitles: id => dispatch(loadTitles(id)),
  onAddEditPressed: title => dispatch(addTitleRequest(title)),
  onRemovePressed: title => dispatch(removeTitleRequest(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);
