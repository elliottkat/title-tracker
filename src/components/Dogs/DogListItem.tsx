import React, { FC, useEffect, useState } from 'react';
import { Button, TableRow, TableCell } from 'grommet';
import { Edit, Trash } from 'grommet-icons';

import '../../scss/DogListItem.scss';

import { Dog } from '../../stores/Dogs/DogTypes';
import { AddEditDog } from './AddEditDog';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';
import { DogDetails } from './DogDetails';
import { FETCH_TITLES_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { useDispatch } from 'react-redux';

interface Props {
    dog: Dog;
}

export const DogListItem: FC<Props> = ({ dog }) => {
    const dispatch = useDispatch();

    const { id } = dog;
    const [showDetails, setShowDetails] = useState(false);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        console.log('fetchTitles');
        dispatch({
            type: FETCH_TITLES_REQUEST,
            apiCb: Api.fetchTitles,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
            params: id,
        });
    }, [dispatch, id]);

    return (
        <TableRow key={dog.id} className="table__row" onClick={() => setShowDetails(!showDetails)}>
            <TableCell margin={{ left: 'small' }}>{dog.name}</TableCell>
            <TableCell className="table__row table__button">
                <DogDetails dog={dog} isShown={showDetails} hide={() => setShowDetails(false)} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button
                    className="action-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowDetails(false);
                        setShowAddEdit(true);
                    }}
                    icon={<Edit color="black" />}
                />
                <AddEditDog dog={dog} isShown={showAddEdit} hide={() => setShowAddEdit(false)} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button
                    className="action-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowDetails(false);
                        setShowDelete(true);
                    }}
                    icon={<Trash color="black" />}
                />
                <DeleteItemConfirm itemType="Dog" item={dog} isShown={showDelete} hide={() => setShowDelete(false)} />
            </TableCell>
        </TableRow>
    );
};
