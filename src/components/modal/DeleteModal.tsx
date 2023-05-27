import ModalLayout from '@components/modal/ModalLayout';
import Button from '@components/common/Button';

type DeleteModalProps = Modal & {
  title: string;
  firstText: string;
  secondText: string;
};

const DeleteModal = ({
  isOpen,
  handleClose,
  title,
  firstText,
  secondText,
  handleClick,
}: DeleteModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} handleClose={handleClose}>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
        <span className="font-bold">{title}</span>
        <div className="mt-[33px] flex flex-col items-center justify-center text-[12px] text-text-primary">
          <span>{firstText}</span>
          <span>{secondText}</span>
        </div>
        <div className="mb-[26px] mt-[68px] flex gap-[18px]">
          <Button isNormal text="취소" onClick={handleClose} />
          <Button isNormal text="삭제" onClick={handleClick} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
