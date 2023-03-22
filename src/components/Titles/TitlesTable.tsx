import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dog } from '../../stores/Dogs/DogTypes';
import { Box, Button, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';
import { AddTitle } from './AddTitle';
import { getTitlesSelector } from '../../stores/Titles/TitleSelector';
import { FETCH_TITLES_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { TitleInfo } from './TitleInfo';

interface Props {
    dog: Dog;
}

export const TitlesTable: FC<Props> = ({ dog }) => {
    const dispatch = useDispatch();
    const { id } = dog;
    const [showAddTitle, setShowAddTitle] = useState(false);

    const titles = useSelector(getTitlesSelector) || [];

    useEffect(() => {
        dispatch({
            type: FETCH_TITLES_REQUEST,
            apiCb: Api.fetchTitles,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
            params: id,
        });
    }, [dispatch, showAddTitle, id]);

    return (
        <Table margin="none" onClick={(event) => event.stopPropagation()}>
            <Box
                direction="row"
                align="center"
                margin={{ top: 'small', right: 'none' }}
                pad="none"
                onClick={(event) => event.stopPropagation()}
            >
                <Text style={{ fontWeight: 'bold' }}>
                    Titles{titles && titles.length > 0 ? ` (Total: ${titles.length})` : ''}
                </Text>
                <Button className="header-button" onClick={() => setShowAddTitle(true)} icon={<AddCircle />} />
                <AddTitle dog={dog} hide={() => setShowAddTitle(false)} isShown={showAddTitle} />
            </Box>
            <TableBody>
                {titles && titles.length > 0 && (
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
                )}
                {titles.map((title) => (
                    <TitleInfo key={title.id} title={title} />
                ))}
            </TableBody>
        </Table>
    );
};
