import React, { FC, useState } from 'react';
import { Title } from '../../stores/Titles/TitleTypes';
import { Button, TableCell, TableRow } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { EditTitle } from './EditTitle';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';

interface Props {
    title: Title;
}

export const TitleInfo: FC<Props> = ({ title }) => {
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showDeleteTitle, setShowDeleteTitle] = useState(false);

    return (
        <TableRow key={title.id}>
            <TableCell key={title.id + title.venue}>{title.venue}</TableCell>
            <TableCell key={title.id + title.name}>{title.name}</TableCell>
            <TableCell key={title.id + title.dateReceived}>{title.dateReceived}</TableCell>
            <TableCell key={`${title.id}-edit`}>
                <Button icon={<Edit />} onClick={() => setShowEditTitle(true)} />
                <EditTitle title={title} hide={() => setShowEditTitle(false)} isShown={showEditTitle} />
            </TableCell>
            <TableCell key={`${title.id}-delete`}>
                <Button onClick={() => setShowDeleteTitle(true)} icon={<Trash />} />
                <DeleteItemConfirm
                    itemType="Title"
                    item={title}
                    isShown={showDeleteTitle}
                    hide={() => setShowDeleteTitle(false)}
                />
            </TableCell>
        </TableRow>
    );
};
