import React, { FC, useState } from 'react';
import { Button, TableRow, TableCell } from 'grommet';
import { Edit, Trash } from 'grommet-icons';

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
        <TableRow
            key={dog.id}
            className="table__row"
            onClick={() => setShowDetails(!showDetails)}
            style={{ border: 'bottom' }}
        >
            <TableCell margin={{ left: 'small' }} style={{ fontWeight: 'bold' }}>
                {dog.name}
            </TableCell>
            <TableCell className="table__row table__button">
                <DogDetails dog={dog} isShown={showDetails} hide={() => setShowDetails(false)} />
            </TableCell>
            <TableCell className="table__row table__button">
                <Button
                    className="action-button"
                    onClick={(event) => {
                        event.stopPropagation();
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
                        setShowDelete(true);
                    }}
                    icon={<Trash color="black" />}
                />
                <DeleteItemConfirm itemType="Dog" item={dog} isShown={showDelete} hide={() => setShowDelete(false)} />
            </TableCell>
        </TableRow>
    );
};
