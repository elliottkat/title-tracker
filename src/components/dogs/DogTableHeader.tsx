import React, { FC } from 'react';

import { Box, Button, Heading } from 'grommet';
import { AddCircle } from 'grommet-icons';

import '../../scss/DogTable.scss';

import { AddEditDog } from './AddEditDog';
import { UseModal } from '../utilities/UseModal';

export const DogTableHeader: FC = () => {
    const { isShowing, toggleAddEditDog } = UseModal();
    const emptyDog = {
        name: '',
        breed: '',
        birthdate: '',
        sex: '',
    };

    return (
        <Box className="table table--fixed">
            <Box direction="row">
                <Heading level={3} className="header-label" margin={{ left: 'small' }}>
                    Dogs
                </Heading>
                <Button className="add-dog-button" onClick={toggleAddEditDog} size="large" icon={<AddCircle />} />
                <AddEditDog dog={emptyDog} isVisible={isShowing} hide={toggleAddEditDog} />
            </Box>
        </Box>
    );
};
