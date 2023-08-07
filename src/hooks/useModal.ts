import { modalComponentState, modalVisibleState } from '@recoil/modal';
import { useSetRecoilState } from 'recoil';

/**
 * @description 모달을 글로벌하게 열고 닫을 수 있는 커스텀 훅입니다.
 * @example
 * const App = () => {
 *  const { openModal } = useModal();
 *
 *  return (
 *    <button onClick={openModal(<LoginModal/>)}></button>
 *  )
 * }
 */
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
