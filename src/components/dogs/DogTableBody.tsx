import React, {useEffect, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Table, TableBody} from 'grommet';

import {DogListItem} from './DogListItem';
import {getDogsSelector} from '../../stores/Dogs/DogSelector';
import {FETCH_DOGS_REQUEST} from '../../stores/Dogs/DogActionTypes';
import * as Api from '../../stores/Api';
import {fetchFailure, fetchSuccess} from '../../stores/CommonActions';

export const DogTableBody: FC = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(getDogsSelector);
    useEffect(() => {
        dispatch({
            type: FETCH_DOGS_REQUEST,
            apiCb: Api.fetchDogs,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
        })
    }, [dispatch]);

    if (dogs && dogs.length > 0) {
        return (
            <Table className="table table--body" alignSelf="stretch" >
                <TableBody>
                {dogs.map(dog => <DogListItem
                    key={dog.name}
                    dog={dog} />)}
                </TableBody>
            </Table>
        );
    }
    return null;
};
