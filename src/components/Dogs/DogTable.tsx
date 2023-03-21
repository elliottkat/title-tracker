import React, { FC } from 'react';
import { Box } from 'grommet';

import '../../scss/DogList.scss';

import { DogTableHeader } from './DogTableHeader';
import { DogTableBody } from './DogTableBody';

export const DogTable: FC = () => {
    return (
        <Box aria-label="Dogs" className="dog-table">
            <DogTableHeader />
            <DogTableBody />
        </Box>
    );
};
