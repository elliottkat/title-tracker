import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Anchor, Box, Form, FormField, RadioButtonGroup, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

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

const sexOptions = ['Male', 'Female'];

export const AddEditDog: FC<Props> = ({ dog, hide, isShown }) => {
    const dispatch = useDispatch();

    const { id } = dog;
    const [name, setName] = useState(dog.name);
    const [breed, setBreed] = useState(dog.breed);
    const [birthdate, setBirthdate] = useState(dog.birthdate);
    const [sex, setSex] = useState(dog.sex);
    const buttonLabel = id ? 'Edit' : 'Add';

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

        hide();
        setName('');
        setBreed('');
        setBirthdate('');
        setSex('');
    };

    return (
        <Modal isShown={isShown} hide={() => hide()} autoHide={true}>
            <Box animation={{ type: 'zoomIn' }} width="800px" onClick={(event) => event.stopPropagation()}>
                <Box
                    pad={{ horizontal: 'small' }}
                    align="center"
                    direction="row"
                    justify="between"
                    gap="large"
                    background={'background-contrast'}
                    border={{ color: 'black', side: 'bottom', size: 'small' }}
                >
                    <Text margin="xxsmall" style={{ fontWeight: 'bold' }}>
                        {id ? `Edit ${dog.name}` : 'Add Dog'}
                    </Text>
                    <Anchor
                        data-testid="add-edit-dog-modal-anchor"
                        icon={<FormClose size="30px" />}
                        onClick={() => hide()}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
                </Box>
                <Box pad={{ horizontal: 'small' }}>
                    <Form>
                        <FormField label="Name">
                            <TextInput value={name} onChange={(event) => setName(event.target.value)} plain />
                        </FormField>
                        <FormField label="Breed">
                            <TextInput value={breed} onChange={(event) => setBreed(event.target.value)} plain />
                        </FormField>
                        <FormField label="Birthdate">
                            <TextInput value={birthdate} onChange={(event) => setBirthdate(event.target.value)} plain />
                        </FormField>
                    </Form>
                    <Box border round="4px" margin={{ bottom: 'small' }}>
                        <RadioButtonGroup
                            name="select-sex-radio"
                            options={sexOptions}
                            value={sex}
                            onChange={(event) => {
                                setSex(event.target.value);
                            }}
                        />
                    </Box>
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
                        label={buttonLabel}
                        disabled={!name || !breed || !birthdate || !sex}
                        onClick={() => onAddEditClick()}
                    />
                </Box>
            </Box>
        </Modal>
    );
};
