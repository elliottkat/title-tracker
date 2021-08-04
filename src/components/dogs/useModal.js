import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingDelete, setIsShowingDelete] = useState(false);
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  function toggleDetails() {
    setIsShowingDetails(!isShowingDetails);
  }

  function toggleDelete() {
    setIsShowingDelete(!isShowingDelete);
  }

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    isShowingDetails,
    isShowingDelete,
    toggleDetails,
    toggleDelete,
    toggle,
  }
};

export default useModal;
