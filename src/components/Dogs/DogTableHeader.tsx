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
            <Box direction="row" justify="between" gap="large" align="center">
                <Heading level={3} margin={{ left: 'medium' }}>
                    Dogs
                </Heading>
                <Button
                    onClick={() => setShowAddDog(true)}
                    size="large"
                    icon={<AddCircle size="34px" color="black" />}
                />
            </Box>
            <AddEditDog dog={emptyDog} isShown={showAddDog} hide={() => setShowAddDog(false)} />
        </Box>
    );
};
