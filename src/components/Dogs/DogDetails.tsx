import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { AddCircle, Edit, FormClose, Trash } from 'grommet-icons';

import '../../scss/DogDetails.scss';

import { AddTitle } from '../Titles/AddTitle';
import { EditTitle } from '../Titles/EditTitle';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';

import { getTitlesSelector } from '../../stores/Titles/TitleSelector';
import { FETCH_TITLES_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Dog } from '../../stores/Dogs/DogTypes';
import { Modal } from '../common/Modal';

interface Props {
    dog: Dog;
    isShown: boolean;
    hide: () => void;
}

export const DogDetails: FC<Props> = ({ dog, isShown, hide }) => {
    const { id, name, breed, birthdate, sex } = dog;
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddTitle, setShowAddTitle] = useState(false);

    const dispatch = useDispatch();
    const allTitles = useSelector(getTitlesSelector) || [];
    useEffect(() => {
        dispatch({
            type: FETCH_TITLES_REQUEST,
            apiCb: Api.fetchTitles,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
            params: id,
        });
    }, [dispatch, id]);

    const titlesToDisplay = allTitles.filter((title) => title.dogId === id);

    const titleTableInfo = titlesToDisplay.map((title) => {
        return (
            <TableRow key={title.id}>
                <TableCell key={title.id + title.venue}>{title.venue}</TableCell>
                <TableCell key={title.id + title.name}>{title.name}</TableCell>
                <TableCell key={title.id + title.dateReceived}>{title.dateReceived}</TableCell>
                <TableCell key={`${title.id}-edit`}>
                    <Button icon={<Edit />} onClick={() => setShowEdit(true)} />
                    <EditTitle dog={dog} title={title} hide={() => setShowEdit(false)} isShown={showEdit} />
                </TableCell>
                <TableCell key={`${title.id}-delete`}>
                    <Button onClick={() => setShowDelete(true)} icon={<Trash />} />
                    <DeleteItemConfirm
                        itemType="title"
                        item={title}
                        isShown={showDelete}
                        hide={() => setShowDelete(false)}
                    />
                </TableCell>
            </TableRow>
        );
    });

    const titleTable = (
        <Box>
            <Table>
                <Box
                    direction="row"
                    justify="between"
                    gap="xlarge"
                    align="center"
                    width="100%"
                    margin={{ top: 'small' }}
                    pad="none"
                >
                    <Text style={{ fontWeight: 'bold' }} margin="none">
                        Titles{titlesToDisplay && titlesToDisplay.length > 0 ? ':' : ''}
                    </Text>
                    <Button className="header-button" onClick={() => setShowAddTitle(true)} icon={<AddCircle />} />
                    <AddTitle dog={dog} hide={() => setShowAddTitle(false)} isVisible={showAddTitle} />
                </Box>
                <TableBody>
                    {titlesToDisplay && titlesToDisplay.length > 0 ? (
                        <TableRow>
                            <TableCell className="table-header" align="left">
                                <Text style={{ fontWeight: 'bold', fontSize: '16px' }} margin={{ left: 'none' }}>
                                    Venue
                                </Text>
                            </TableCell>
                            <TableCell className="table-header" align="left">
                                <Text style={{ fontWeight: 'bold', fontSize: '16px' }} margin={{ left: 'none' }}>
                                    Title
                                </Text>
                            </TableCell>
                            <TableCell className="table-header" align="left">
                                <Text style={{ fontWeight: 'bold', fontSize: '16px' }} margin={{ left: 'none' }}>
                                    Date Received
                                </Text>
                            </TableCell>
                            <th className="table-header" />
                            <th className="table-header" />
                        </TableRow>
                    ) : null}
                    {titlesToDisplay && titlesToDisplay.length > 0 ? titleTableInfo : null}
                </TableBody>
            </Table>
        </Box>
    );

    return (
        <Modal isShown={isShown} hide={hide}>
            <Box margin="small">
                <Box border={{ size: 'small', side: 'bottom', color: 'black' }}>
                    <Box
                        direction="row"
                        align="center"
                        justify="between"
                        gap="xlarge"
                        border={{ size: 'small', side: 'bottom', color: 'black' }}
                        margin={{ bottom: 'small' }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: '28px' }}>{name}</Text>
                        <Button aria-label="Close" onClick={hide} icon={<FormClose size="34px" />} />
                    </Box>
                    <Box direction="row" margin={{ bottom: 'xsmall' }} align="center">
                        <Text style={{ fontWeight: 'bold', fontSize: '18px' }} margin={{ right: 'small' }}>
                            Breed:
                        </Text>
                        <Text style={{ fontSize: '16px' }}> {breed}</Text>
                    </Box>
                    <Box direction="row" margin={{ bottom: 'xsmall' }} align="center">
                        <Text style={{ fontWeight: 'bold', fontSize: '18px' }} margin={{ right: 'small' }}>
                            Birthdate:
                        </Text>
                        <Text style={{ fontSize: '16px' }}> {birthdate}</Text>
                    </Box>
                    <Box direction="row" align="center" margin={{ right: 'small', bottom: 'small' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: '18px' }} margin={{ right: 'small' }}>
                            Sex:
                        </Text>
                        <Text style={{ fontSize: '16px' }}> {sex}</Text>
                    </Box>
                </Box>
                {titleTable}
            </Box>
        </Modal>
    );
};
