import React, { FC, useState } from 'react';

import { Box, Button, Heading } from 'grommet';
import { AddCircle } from 'grommet-icons';

import '../../scss/DogTable.scss';

import { AddEditDog } from './AddEditDog';

export const DogTableHeader: FC = () => {
    const [showAddDog, setShowAddDog] = useState(false);
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
                <Button
                    className="add-dog-button"
                    onClick={() => setShowAddDog(true)}
                    size="large"
                    icon={<AddCircle />}
                />
                <AddEditDog dog={emptyDog} isShown={showAddDog} hide={() => setShowAddDog(false)} />
            </Box>
        </Box>
    );
};
