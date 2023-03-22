import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dog } from '../../stores/Dogs/DogTypes';
import { Box, Button, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { AddCircle, Edit, Trash } from 'grommet-icons';
import { EditTitle } from './EditTitle';
import { DeleteItemConfirm } from '../common/DeleteItemConfirm';
import { getTitlesSelector } from '../../stores/Titles/TitleSelector';
import { FETCH_TITLES_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { AddTitle } from './AddTitle';

interface Props {
    dog: Dog;
}

export const TitlesTable: FC<Props> = ({ dog }) => {
    const dispatch = useDispatch();
    const { id } = dog;
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddTitle, setShowAddTitle] = useState(false);

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

    console.log(allTitles);
    const titlesToDisplay = allTitles.filter((title) => title.dogId === id);
    const titleTableInfo = titlesToDisplay.map((title) => {
        return (
            <TableRow key={title.id}>
                <TableCell key={title.id + title.venue}>{title.venue}</TableCell>
                <TableCell key={title.id + title.name}>{title.name}</TableCell>
                <TableCell key={title.id + title.dateReceived}>{title.dateReceived}</TableCell>
                <TableCell key={`${title.id}-edit`}>
                    <Button
                        icon={<Edit />}
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowEdit(true);
                        }}
                    />
                    <EditTitle dog={dog} title={title} hide={() => setShowEdit(false)} isShown={showEdit} />
                </TableCell>
                <TableCell key={`${title.id}-delete`}>
                    <Button
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowDelete(true);
                        }}
                        icon={<Trash />}
                    />
                    <DeleteItemConfirm
                        itemType="Title"
                        item={title}
                        isShown={showDelete}
                        hide={() => setShowDelete(false)}
                    />
                </TableCell>
            </TableRow>
        );
    });

    return (
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
                    <Button
                        className="header-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowAddTitle(true);
                        }}
                        icon={<AddCircle />}
                    />
                    <AddTitle dog={dog} hide={() => setShowAddTitle(false)} isShown={showAddTitle} />
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
};
