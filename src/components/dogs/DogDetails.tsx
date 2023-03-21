import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TableRow } from 'grommet';
import { AddCircle, Edit, FormClose, Trash } from 'grommet-icons';

import '../../scss/DogDetails.scss';

import AddTitle from '../titles/AddTitle';
import { EditTitle } from '../titles/EditTitle';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';

import { UseModal } from '../utilities/UseModal';

import { getTitlesSelector } from '../../stores/Titles/TitleSelector';
import { FETCH_TITLES_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Dog } from '../../stores/Dogs/DogTypes';

interface DogDetailsProps {
    dog: Dog;
    isShowing: boolean;
    hide: () => void;
}

export const DogDetails: FC<DogDetailsProps> = ({ dog, isShowing, hide }) => {
    const { id, name, breed, birthdate, sex } = dog;

    const { isShowingAddTitle, isShowingEditTitle, toggleAddTitle, toggleEditTitle, isShowingDelete, toggleDelete } =
        UseModal();

    const dispatch = useDispatch();
    const titles = useSelector(getTitlesSelector) || [];
    useEffect(() => {
        dispatch({
            type: FETCH_TITLES_REQUEST,
            apiCb: Api.fetchTitles,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
            params: id,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (!isShowing) {
        return null;
    }

    const titleTableInfo = titles.map((title) => {
        return (
            <TableRow key={title.id}>
                <td key={title.id + title.venue} className="table-data">
                    {title.venue}
                </td>
                <td key={title.id + title.name} className="table-data">
                    {title.name}
                </td>
                <td key={title.id + title.dateReceived} className="table-data">
                    {title.dateReceived}
                </td>
                <td key={title.id + 'edit'} className="title-edit-button">
                    <Button className="title-delete-button" icon={<Edit />} onClick={toggleEditTitle} />
                    <EditTitle dog={dog} title={title} hide={toggleEditTitle} isVisible={isShowingEditTitle} />
                </td>
                <td key={title.id + 'delete'} className="table-data">
                    <Button className="title-delete-button" onClick={toggleDelete} icon={<Trash />} />
                    <DeleteItemConfirm itemType="title" item={title} isVisible={isShowingDelete} hide={toggleDelete} />
                </td>
            </TableRow>
        );
    });

    const titleTable = (
        <div>
            <table className="title-table">
                <caption className="caption-style">
                    Titles{titles && titles.length > 0 ? ':' : ''}
                    <button className="header-button" onClick={toggleAddTitle}>
                        <text className="text-style">
                            <AddCircle />
                        </text>
                    </button>
                    <AddTitle dog={dog} hide={toggleAddTitle} isVisible={isShowingAddTitle} />
                </caption>
                <tbody>
                    {titles && titles.length > 0 ? (
                        <TableRow>
                            <th className="table-header" align="left">
                                Venue
                            </th>
                            <th className="table-header" align="left">
                                Title
                            </th>
                            <th className="table-header" align="left">
                                Date Received
                            </th>
                            <th className="table-header" />
                            <th className="table-header" />
                        </TableRow>
                    ) : null}
                    {titles && titles.length > 0 ? titleTableInfo : null}
                </tbody>
            </table>
        </div>
    );

    return (
        isShowing &&
        createPortal(
            <>
                <div className="modal details-modal" aria-modal aria-hidden tabIndex={-1} role="dialog">
                    <div>
                        <div className="dog-form">
                            <table className="name-table">
                                <th style={{ fontWeight: 'bold', fontSize: '24px', padding: '10px' }}>
                                    {name}
                                    <button className="header-button" aria-label="Close" onClick={hide}>
                                        <text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                            <FormClose />
                                        </text>
                                    </button>
                                </th>
                            </table>
                            <hr />
                            <div>
                                <p>
                                    <text style={{ fontWeight: 'bold', fontSize: '20px' }}>Breed:</text>
                                    <text style={{ fontSize: '16px' }}> {breed}</text>
                                </p>
                            </div>
                            <p />
                            <div>
                                <p>
                                    <text style={{ fontWeight: 'bold', fontSize: '20px' }}>Birthdate:</text>
                                    <text style={{ fontSize: '16px' }}> {birthdate}</text>
                                </p>
                            </div>
                            <p />
                            <div>
                                <p>
                                    <text style={{ fontWeight: 'bold', fontSize: '20px' }}>Sex:</text>
                                    <text style={{ fontSize: '16px' }}> {sex}</text>
                                </p>
                            </div>
                            {titleTable}
                            <p />
                        </div>
                    </div>
                </div>
            </>,
            document.body,
        )
    );
};
