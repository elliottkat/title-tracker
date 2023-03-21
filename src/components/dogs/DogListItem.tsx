import React, { FC } from 'react';
import { Button, TableRow, TableCell } from 'grommet';
import { CircleInformation, Edit, Trash } from 'grommet-icons';

import '../../scss/DogListItem.scss';

import { UseModal } from '../utilities/UseModal';
import { Dog } from '../../stores/Dogs/DogTypes';
import { AddEditDog } from './AddEditDog';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';
import { DogDetails } from './DogDetails';

interface DogListItemProps {
    dog: Dog;
}

export const DogListItem: FC<DogListItemProps> = ({ dog }) => {
    const { isShowing, isShowingDetails, isShowingDelete, toggleAddEditDog, toggleDetails, toggleDelete } = UseModal();

    return (
        <TableRow key={dog.id} className="table__row">
            <TableCell margin={{ left: 'small' }}>{dog.name}</TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={toggleDetails} icon={<CircleInformation />} />
                <DogDetails dog={dog} isShowing={isShowingDetails} hide={toggleDetails} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={toggleAddEditDog} icon={<Edit />} />
                <AddEditDog dog={dog} isVisible={isShowing} hide={toggleAddEditDog} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={toggleDelete} icon={<Trash />} />
                <DeleteItemConfirm itemType="dog" item={dog} isVisible={isShowingDelete} hide={toggleDelete} />
            </TableCell>
        </TableRow>
    );
};
