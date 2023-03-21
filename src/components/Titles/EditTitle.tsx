import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, Form, FormField, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import { EDIT_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Dog } from '../../stores/Dogs/DogTypes';
import { Title } from '../../stores/Titles/TitleTypes';
import { Modal } from '../common/Modal';
import { AppFonts as fonts } from '../styling/AppFonts';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';

interface Props {
    dog: Dog;
    title: Title;
    isShown: boolean;
    hide: () => void;
}

export const EditTitle: FC<Props> = ({ dog, title, isShown, hide }) => {
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
        <Modal isShown={isShown} hide={() => hide()} autoHide={true}>
            <Box animation={{ type: 'zoomIn' }} onClick={(event) => event.stopPropagation()}>
                <Box
                    pad={{ horizontal: 'small' }}
                    align="center"
                    direction="row"
                    justify="between"
                    gap="large"
                    background={'background-contrast'}
                    border={{ color: 'black', side: 'bottom', size: 'small' }}
                >
                    <Text size={fonts.title} margin="xxsmall">
                        Edit Title
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
                <Box pad={{ horizontal: 'small' }}>
                    <Form>
                        <FormField label="Venue">
                            <TextInput value={venue} onChange={(event) => setVenue(event.target.value)} plain />
                        </FormField>
                        <FormField label="Name">
                            <TextInput value={name} onChange={(event) => setName(event.target.value)} plain />
                        </FormField>
                        <FormField label="Date Received">
                            <TextInput
                                value={dateReceived}
                                onChange={(event) => setDateReceived(event.target.value)}
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
                        label="Edit"
                        disabled={!venue || !name || !dateReceived}
                        onClick={() => {
                            hide();
                            onEditClick();
                            setName('');
                            setVenue('');
                            setDateReceived('');
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};
