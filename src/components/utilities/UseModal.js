import { useState } from 'react';

export const UseModal = () => {
    const [isShowing, setIsShowingAddEditDog] = useState(false);
    const [isShowingDelete, setIsShowingDelete] = useState(false);
    const [isShowingDetails, setIsShowingDetails] = useState(false);
    const [isShowingAddTitle, setIsShowingAddTitle] = useState(false);
    const [isShowingEditTitle, setIsShowingEditTitle] = useState(false);

    function toggleAddTitle() {
        setIsShowingAddTitle(!isShowingAddTitle);
    }

    function toggleEditTitle() {
        setIsShowingEditTitle(!isShowingEditTitle);
    }

    function toggleDetails() {
        setIsShowingDetails(!isShowingDetails);
    }

    function toggleDelete() {
        setIsShowingDelete(!isShowingDelete);
    }

    function toggleAddEditDog() {
        setIsShowingAddEditDog(!isShowing);
    }

    return {
        isShowing,
        isShowingDetails,
        isShowingDelete,
        isShowingAddTitle,
        isShowingEditTitle,
        toggleDetails,
        toggleAddTitle,
        toggleEditTitle,
        toggleDelete,
        toggleAddEditDog,
    };
};
