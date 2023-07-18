import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

const useModal = () => {
  const setIsShowModal = useSetRecoilState(modalVisibleState);
  const setModal = useSetRecoilState(modalComponentState);

  const openModal = useCallback(
    (Component: React.ReactElement | '') => {
      setIsShowModal(true);
      setModal(Component);
    },
    [setIsShowModal, setModal],
  );

  const closeModal = useCallback(() => {
    setIsShowModal(false);
    setModal('');
  }, [setIsShowModal, setModal]);

  return { openModal, closeModal };
};

export default useModal;
