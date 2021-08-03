import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingDelete, setIsShowingDelete] = useState(false);

  function toggleDelete() {
    setIsShowingDelete(!isShowingDelete);
  }

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    isShowingDelete,
    toggleDelete,
    toggle,
  }
};

export default useModal;
