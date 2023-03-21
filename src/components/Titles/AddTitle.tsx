import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, Form, FormField, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import { ADD_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';

import { Modal } from '../common/Modal';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';
import { Dog } from '../../stores/Dogs/DogTypes';
import * as Api from '../../stores/Api';

interface Props {
    dog: Dog;
    isShown: boolean;
    hide: () => void;
}

export const AddTitle: FC<Props> = ({ dog, isShown, hide }) => {
    const dogId = dog.id;
    const [venue, setVenue] = useState('');
    const [name, setName] = useState('');
    const [dateReceived, setDateReceived] = useState('');
    const dispatch = useDispatch();

    const onAddClick = () => {
        const params = { dogId, name, venue, dateReceived };
        dispatch({
            type: ADD_TITLE_REQUEST,
            apiCb: Api.addTitle,
            errorCb: fetchFailure,
            successCb: fetchSuccess,
            params,
        });
    };

    return (
        <Modal isShown={isShown} hide={() => hide()} autoHide={true}>
            <Box animation={{ type: 'zoomIn' }} width="400px">
                <Box
                    pad={{ horizontal: 'small' }}
                    align="center"
                    direction="row"
                    justify="between"
                    gap="large"
                    background={'background-contrast'}
                    border={{ color: 'black', side: 'bottom', size: 'small' }}
                >
                    <Text style={{ fontWeight: 'bold' }} margin="xxsmall">
                        Add Title
                    </Text>
                    <Anchor
                        icon={<FormClose size="medium" />}
                        onClick={(event) => {
                            event.stopPropagation();
                            hide();
                        }}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
                </Box>
                <Box pad={{ horizontal: 'small' }} onClick={(event) => event.stopPropagation()}>
                    <Form>
                        <FormField label="Venue">
                            <TextInput
                                value={venue}
                                onChange={(event) => setVenue(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                        <FormField label="Name">
                            <TextInput
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                        <FormField label="Date Received">
                            <TextInput
                                value={dateReceived}
                                onChange={(event) => setDateReceived(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                    </Form>
                </Box>
                <Box
                    direction="row"
                    justify="center"
                    gap="small"
                    background={'background-contrast'}
                    pad="small"
                    border={{ color: 'black', side: 'top', size: 'small' }}
                >
                    <TitleTrackerButton
                        label="Add"
                        disabled={!venue || !name || !dateReceived}
                        onClick={(event) => {
                            event.stopPropagation();
                            hide();
                            onAddClick();
                            setName('');
                            setVenue('');
                            setName('');
                            setDateReceived('');
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};
