import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Anchor, Box, CardBody, CardFooter, CardHeader, Form, FormField, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import { AppFonts as fonts } from '../styling/AppFonts';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';

import { Modal } from '../common/Modal';
import { ADD_DOG_REQUEST, EDIT_DOG_REQUEST } from '../../stores/Dogs/DogActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Dog } from '../../stores/Dogs/DogTypes';

interface Props {
    dog: Dog;
    hide: () => void;
    isShown: boolean;
}

export const AddEditDog: FC<Props> = ({ dog, hide, isShown }) => {
    const { id } = dog;
    const [name, setName] = useState(dog.name);
    const [breed, setBreed] = useState(dog.breed);
    const [birthdate, setBirthdate] = useState(dog.birthdate);
    const [sex, setSex] = useState(dog.sex);
    const buttonLabel = id ? 'Edit' : 'Add';
    const dispatch = useDispatch();

    const onAddEditClick = () => {
        if (id) {
            const { createdAt } = dog;
            const updatedAt = new Date();
            const params = { id, name, breed, birthdate, sex, createdAt, updatedAt };
            dispatch({
                type: EDIT_DOG_REQUEST,
                apiCb: Api.editDog,
                errorCb: fetchFailure,
                successCb: fetchSuccess,
                params,
            });
        } else {
            const params = { name, breed, birthdate, sex };
            dispatch({
                type: ADD_DOG_REQUEST,
                apiCb: Api.addDog,
                errorCb: fetchFailure,
                successCb: fetchSuccess,
                params,
            });
        }
    };

    return (
        <Modal isShown={isShown} hide={() => hide()} autoHide={true}>
            <Box animation={{ type: 'zoomIn' }}>
                <CardHeader margin="0" pad={{ horizontal: 'small' }}>
                    <Text size={fonts.title} margin="xxsmall">
                        {id ? `Edit ${dog.name}` : 'Add Dog'}
                    </Text>
                    <Anchor
                        data-testid="add-edit-dog-modal-anchor"
                        icon={<FormClose size="medium" />}
                        onClick={() => hide()}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
                </CardHeader>
                <CardBody pad={{ horizontal: 'small' }}>
                    <Form>
                        <FormField label="Name">
                            <TextInput
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                        <FormField label="Breed">
                            <TextInput
                                value={breed}
                                onChange={(event) => setBreed(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                        <FormField label="Birthdate">
                            <TextInput
                                value={birthdate}
                                onChange={(event) => setBirthdate(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                        <FormField label="Sex">
                            <TextInput
                                value={sex}
                                onChange={(event) => setSex(event.target.value)}
                                focusIndicator={true}
                                plain
                            />
                        </FormField>
                    </Form>
                </CardBody>
                <CardFooter direction="row" justify="center" gap="small" background="background-contrast" pad="small">
                    <TitleTrackerButton
                        label={buttonLabel}
                        disabled={!name || !breed || !birthdate || !sex}
                        onClick={() => {
                            hide();
                            onAddEditClick();
                            setName('');
                            setBreed('');
                            setBirthdate('');
                            setSex('');
                        }}
                    ></TitleTrackerButton>
                </CardFooter>
            </Box>
        </Modal>
    );
};
