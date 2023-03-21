import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, CardFooter, CardHeader, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

import '../../scss/DogActionButtons.scss';
import { REMOVE_DOG_REQUEST } from '../../stores/Dogs/DogActionTypes';
import { REMOVE_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Modal } from './Modal';
import { AppFonts as fonts } from '../styling/AppFonts';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';

interface Props {
    item: any;
    itemType: string;
    isShown: boolean;
    hide: () => void;
}

export const DeleteItemConfirm: FC<Props> = ({ item, itemType, isShown, hide }) => {
    const { name, id } = item;
    const venue = item.venue;
    const deleteItemHeader = venue ? `${venue} ${name}` : name;
    const dispatch = useDispatch();

    const onConfirmDeleteClick = () => {
        const params = id;
        if (itemType === 'title') {
            dispatch({
                type: REMOVE_TITLE_REQUEST,
                apiCb: Api.removeTitle,
                errorCb: fetchFailure,
                successCb: fetchSuccess,
                params,
            });
        } else if (itemType === 'dog') {
            dispatch({
                type: REMOVE_DOG_REQUEST,
                apiCb: Api.removeDog,
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
                        Delete {deleteItemHeader}?
                    </Text>
                    <Anchor
                        data-testid="add-edit-dog-modal-anchor"
                        icon={<FormClose size="medium" />}
                        onClick={() => hide()}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
                </CardHeader>
                <CardFooter direction="row" justify="center" gap="small" background="background-contrast" pad="small">
                    <TitleTrackerButton
                        label="Delete"
                        onClick={() => {
                            hide();
                            onConfirmDeleteClick();
                        }}
                    ></TitleTrackerButton>
                </CardFooter>
            </Box>
        </Modal>
    );
};
