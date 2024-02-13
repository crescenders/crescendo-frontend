import ModalPortal from '@components/modal/ModalPortal';
import Button from '@components/common/Button';
import useModal from '@hooks/useModal';

type DeleteModalProps = {
  title: string;
  firstText: string;
  secondText: string;
  handleClick: () => void;
};

const DeleteModal = ({
  title,
  firstText,
  secondText,
  handleClick,
}: DeleteModalProps) => {
  const { closeModal } = useModal();
  return (
    <ModalPortal>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
        <span className="font-bold">{title}</span>
        <div className="mt-[33px] flex flex-col items-center justify-center text-[12px] text-text-primary">
          <span>{firstText}</span>
          <span>{secondText}</span>
        </div>
        <div className="mb-[26px] mt-[68px] flex gap-[18px]">
          <Button isNormal text="취소" onClick={closeModal} />
          <Button isNormal text="삭제" onClick={handleClick} />
        </div>
      </div>
    </ModalPortal>
  );
};

export default DeleteModal;
