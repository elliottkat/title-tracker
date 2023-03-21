import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, CardBody, CardFooter, CardHeader, Form, FormField, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import { EDIT_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Dog } from '../../stores/Dogs/DogTypes';
import { Title } from '../../stores/Titles/TitleTypes';
import { Modal } from '../common/Modal';
import { AppFonts as fonts } from '../styling/AppFonts';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';

interface EditTitleProps {
    dog: Dog;
    title: Title;
    isVisible: boolean;
    hide: () => void;
}

export const EditTitle: FC<EditTitleProps> = ({ dog, title, isVisible, hide }) => {
    const dogId = dog.id;
    const { id } = title;

    const [venue, setVenue] = useState(title.venue);
    const [name, setName] = useState(title.name);
    const [dateReceived, setDateReceived] = useState(title.dateReceived);
    const dispatch = useDispatch();

    const onEditClick = () => {
        const params = { dogId, id, name, venue, dateReceived };
        dispatch({
            type: EDIT_TITLE_REQUEST,
            apiCb: Api.editTitle,
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
                        label="Edit"
                        disabled={!venue || !name || !dateReceived}
                        onClick={() => {
                            hide();
                            onEditClick();
                            setName('');
                            setVenue('');
                            setDateReceived('');
                        }}
                    ></TitleTrackerButton>
                </CardFooter>
            </Box>
        </Modal>
    );
};
