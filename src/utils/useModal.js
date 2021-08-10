import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowingAddEditDog] = useState(false);
  const [isShowingDelete, setIsShowingDelete] = useState(false);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [isShowingAddEditTitle, setIsShowingAddEditTitle] = useState(false);

  function toggleAddEditTitle() {
    setIsShowingAddEditTitle(!isShowingAddEditTitle);
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
    isShowingAddEditTitle,
    toggleDetails,
    toggleAddEditTitle,
    toggleDelete,
    toggleAddEditDog
  }
};

export default useModal;
