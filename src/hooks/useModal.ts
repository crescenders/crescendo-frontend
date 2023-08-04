import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useSetRecoilState } from 'recoil';

const useModal = () => {
  const setIsShowModal = useSetRecoilState(modalVisibleState);
  const setModal = useSetRecoilState(modalComponentState);

  const openModal = (Component: React.ReactElement | '') => {
    setIsShowModal(true);
    setModal(Component);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setModal('');
  };

  return { openModal, closeModal };
};

export default useModal;
