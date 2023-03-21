import React, { FC, Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import { Wrapper, StyledModal, Content, Backdrop } from './Modal.style';
import { TitleTrackerTheme } from './Modal.theme';
import { Grommet } from 'grommet';

type Props = {
    isShown: boolean;
    autoHide?: boolean;
    hide: () => void;
};

export const Modal: FC<Props> = ({ isShown, hide, autoHide = true, children }) => {
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Escape' && isShown && autoHide) {
            if (hide) hide();
        }
    };

    useEffect(() => {
        isShown ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    });

    const modal = (
        <Fragment>
            {autoHide ? (
                <Backdrop onClick={hide} data-testid="backdrop" />
            ) : (
                <Backdrop onClick={(e) => e.stopPropagation()} data-testid="backdrop" />
            )}
            <FocusLock>
                <Grommet theme={TitleTrackerTheme}>
                    <Wrapper aria-modal tabIndex={-1} role="dialog">
                        <StyledModal>
                            <Content>{children}</Content>
                        </StyledModal>
                    </Wrapper>
                </Grommet>
            </FocusLock>
        </Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
