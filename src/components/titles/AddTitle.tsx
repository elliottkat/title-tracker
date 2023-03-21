import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, CardBody, CardFooter, CardHeader, Form, FormField, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import { ADD_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';

import { Modal } from '../common/Modal';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { AppFonts as fonts } from '../styling/AppFonts';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';
import { Dog } from '../../stores/Dogs/DogTypes';
import * as Api from '../../stores/Api';

interface AddTitleProps {
    dog: Dog;
    isVisible: boolean;
    hide: () => void;
}
const AddTitle: FC<AddTitleProps> = ({ dog, isVisible, hide }) => {
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
        <Modal isShown={isVisible} hide={() => hide()} autoHide={true}>
            <Box animation={{ type: 'zoomIn' }}>
                <CardHeader margin="0" pad={{ horizontal: 'small' }}>
                    <Text size={fonts.title} margin="xxsmall">
                        Add Title
                    </Text>
                    <Anchor
                        icon={<FormClose size="medium" />}
                        onClick={() => hide()}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
                </CardHeader>
                <CardBody pad={{ horizontal: 'small' }}>
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
                </CardBody>
                <CardFooter direction="row" justify="center" gap="small" background="background-contrast" pad="small">
                    <TitleTrackerButton
                        label="Add"
                        disabled={!venue || !name || !dateReceived}
                        onClick={() => {
                            hide();
                            onAddClick();
                            setName('');
                            setVenue('');
                            setName('');
                            setDateReceived('');
                        }}
                    ></TitleTrackerButton>
                </CardFooter>
            </Box>
        </Modal>
    );
};

export default AddTitle;
