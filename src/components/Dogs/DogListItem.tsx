import React, { FC, useState } from 'react';
import { Button, TableRow, TableCell } from 'grommet';
import { CircleInformation, Edit, Trash } from 'grommet-icons';

import '../../scss/DogListItem.scss';

import { Dog } from '../../stores/Dogs/DogTypes';
import { AddEditDog } from './AddEditDog';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';
import { DogDetails } from './DogDetails';

interface Props {
    dog: Dog;
}

export const DogListItem: FC<Props> = ({ dog }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showAddEdit, setShowAddEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return (
        <TableRow key={dog.id} className="table__row">
            <TableCell margin={{ left: 'small' }}>{dog.name}</TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={() => setShowDetails(true)} icon={<CircleInformation />} />
                <DogDetails dog={dog} isShown={showDetails} hide={() => setShowDetails(false)} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={() => setShowAddEdit(true)} icon={<Edit />} />
                <AddEditDog dog={dog} isShown={showAddEdit} hide={() => setShowAddEdit(false)} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button className="action-button" onClick={() => setShowDelete(true)} icon={<Trash />} />
                <DeleteItemConfirm itemType="dog" item={dog} isShown={showDelete} hide={() => setShowDelete(false)} />
            </TableCell>
        </TableRow>
    );
};
