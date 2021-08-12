import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faEdit, faTrashAlt, faPlus} from '@fortawesome/free-solid-svg-icons';

import '../../scss/DogDetails.scss';

import AddTitle from '../titles/AddTitle';
import EditTitle from '../titles/EditTitle';
import DeleteItemConfirm from '../common/DeleteItemConfirm';

import {addTitleRequest, editTitleRequest, loadTitles, removeTitleRequest} from '../../thunks/thunks';
import useModal from '../../utils/useModal';

const DogDetails = (props) => {
  if (!props.isShowing) {
    return null;
  }

  const {dog} = props;
  const titles = props.titles;
  const {id, name, breed, birthdate, sex} = props.dog;

  const {
    isShowingAddTitle,
    isShowingEditTitle,
    toggleAddTitle,
    toggleEditTitle,
    isShowingDelete,
    toggleDelete
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useModal();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    props.startLoadingTitles(id);
  }, [id]);

  const titleTableInfo = titles.map(title => {
    return (
      <tr>
        <td key={title.id + title.venue} className='table-data'>{title.venue}</td>
        <td key={title.id + title.name} className='table-data'>{title.name}</td>
        <td key={title.id + title.dateReceived} className='table-data'>{title.dateReceived}</td>
        <td key={title.id + 'edit'} className='title-edit-button'>
          <button
            className='title-delete-button'
            onClick={toggleEditTitle}
          ><FontAwesomeIcon icon={faEdit}/></button>
          <EditTitle
            dog={dog}
            title={title}
            hide={toggleEditTitle}
            isShowing={isShowingEditTitle}
            onEditPressed={() => props.onEditPressed(title)} />
        </td>
        <td key={title.id + 'delete'} className='table-data'>
          <button className='title-delete-button' onClick={toggleDelete}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </button>
          <DeleteItemConfirm
            item={title}
            isShowing={isShowingDelete}
            hide={toggleDelete}
            onRemovePressed={() => props.onRemovePressed(title)} />
        </td>
      </tr>
    );
  });

  const titleTable = (
    <div align='left'>
      <table className='title-table'>
        <caption className='caption-style'>Titles{titles.length > 0 ? ':' : ''}
          <button className='header-button'
            onClick={toggleAddTitle}>
            <text className='text-style'>
              <FontAwesomeIcon icon={faPlus} />
            </text>
          </button>
          <AddTitle
            dog={dog}
            hide={toggleAddTitle}
            isShowing={isShowingAddTitle}
            onAddPressed={props.onAddPressed}
          />
        </caption>
        <tbody>
        {titles.length > 0 ?
          (
            <tr>
              <th className='table-header' align='left'>Venue</th>
              <th className='table-header' align='left'>Title</th>
              <th className='table-header' align='left'>Date Received</th>
              <th className='table-header'/>
              <th className='table-header'/>
            </tr>
            ) : null
        }
        {titles.length > 0 ? titleTableInfo : null}
        </tbody>
      </table>
    </div>
  );

  return props.isShowing && createPortal (
    <>
      <div className='modal details-modal' aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div>
          <div className='dog-form'>
            <table className='name-table'>
              <th
                style={{fontWeight: "bold", fontSize: "24px", padding: "10px"}}>
                {name}
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
            <hr/>
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
            {titleTable}
            <p />
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
  onAddPressed: title => dispatch(addTitleRequest(title)),
  onEditPressed: title => dispatch(editTitleRequest(title)),
  onRemovePressed: title => dispatch(removeTitleRequest(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);
