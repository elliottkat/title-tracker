import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Anchor, Box, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

import '../../scss/DogActionButtons.scss';
import { REMOVE_DOG_REQUEST } from '../../stores/Dogs/DogActionTypes';
import { REMOVE_TITLE_REQUEST } from '../../stores/Titles/TitleActionTypes';
import * as Api from '../../stores/Api';
import { fetchFailure, fetchSuccess } from '../../stores/CommonActions';
import { Modal } from './Modal';
import { TitleTrackerButton } from '../Elements/TitleTrackerButton';

interface Props {
    item: any;
    itemType: string;
    isShown: boolean;
    hide: () => void;
}

export const DeleteItemConfirm: FC<Props> = ({ item, itemType, isShown, hide }) => {
    const { name, id } = item;
    const { venue } = item;
    const deleteItemHeader = itemType === 'Title' ? `Title ${venue} ${name}` : name;
    const dispatch = useDispatch();

    const onConfirmDeleteClick = () => {
        const params = id;
        if (itemType === 'Title') {
            dispatch({
                type: REMOVE_TITLE_REQUEST,
                apiCb: Api.removeTitle,
                errorCb: fetchFailure,
                successCb: fetchSuccess,
                params,
            });
        } else if (itemType === 'Dog') {
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
            <Box
                animation={{ type: 'zoomIn' }}
                width="400px"
                border
                round="6px"
                onClick={(event) => event.stopPropagation()}
            >
                <Box
                    pad={{ horizontal: 'small' }}
                    align="center"
                    direction="row"
                    justify="between"
                    gap="large"
                    border={{ color: 'black', side: 'bottom', size: 'small' }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: '20px' }} margin="xxsmall">
                        Delete {deleteItemHeader}?
                    </Text>
                    <Anchor
                        data-testid="add-edit-dog-modal-anchor"
                        icon={<FormClose size="30px" />}
                        onClick={() => hide()}
                        margin={{ left: 'auto', right: '-8px' }}
                    />
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
                        label="Delete"
                        onClick={() => {
                            hide();
                            onConfirmDeleteClick();
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};
