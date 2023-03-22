import React, { FC } from 'react';
import { Box, Button, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

import '../../scss/DogDetails.scss';

import { TitlesTable } from '../Titles/TitlesTable';

import { Dog } from '../../stores/Dogs/DogTypes';
import { Modal } from '../common/Modal';

interface Props {
    dog: Dog;
    isShown: boolean;
    hide: () => void;
}

export const DogDetails: FC<Props> = ({ dog, isShown, hide }) => {
    const { name, breed, birthdate, sex } = dog;

    return (
        <Modal isShown={isShown} hide={hide}>
            <Box margin="small" width="800px" onClick={(event) => event.stopPropagation()} hoverIndicator={false}>
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
                        <Button
                            aria-label="Close"
                            onClick={hide}
                            icon={<FormClose size="34px" />}
                            hoverIndicator={false}
                        />
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
                <TitlesTable dog={dog} />
            </Box>
        </Modal>
    );
};
