import Layout from './Layout';
import Button from '@components/common/Button';

type DeleteModalProps = {
  isOpen: boolean;
  close: () => void;
  title: string;
  firstText: string;
  secondText: string;
  handleDelete: () => void;
};

const DeleteModal = ({
  isOpen,
  close,
  title,
  firstText,
  secondText,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <Layout isOpen={isOpen} close={close}>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
        <span className="font-bold">{title}</span>
        <div className="mt-[33px] flex flex-col items-center justify-center text-[12px] text-text-primary">
          <span>{firstText}</span>
          <span>{secondText}</span>
        </div>
        <div className="mb-[26px] mt-[68px] flex gap-[18px]">
          <Button isNormal text="취소" onClick={close} />
          <Button isNormal text="삭제" onClick={handleDelete} />
        </div>
      </div>
    </Layout>
  );
};

export default DeleteModal;
