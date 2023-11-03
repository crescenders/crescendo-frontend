import ModalPortal from '@components/portal/ModalPortal';
import Button from '@components/common/Button';
import useModal from '@hooks/useModal';
import MemberModal from './MemberModal';

type DeleteModalProps = {
  title: string;
  firstText: string;
  secondText: string;
  handleClick: () => void;
};

const DeleteMemberModal = ({
  title,
  firstText,
  secondText,
  handleClick,
}: DeleteModalProps) => {
  const { openModal } = useModal();
  return (
    <ModalPortal>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
        <span className="font-bold">{title}</span>
        <div className="mt-[33px] flex flex-col items-center justify-center text-[12px] text-text-primary">
          <span>{firstText}</span>
          <span>{secondText}</span>
        </div>
        <div className="mb-[26px] mt-[68px] flex gap-[18px]">
          <Button
            isNormal
            text="취소"
            onClick={() =>
              openModal(
                <MemberModal
                  title={
                    title === '멤버 추방' ? '스터디원 목록' : '참여 신청자'
                  }
                />,
              )
            }
          />
          <Button
            isNormal
            className="bg-warning text-white"
            text={title === '멤버 추방' ? '추방' : '거절'}
            onClick={handleClick}
          />
        </div>
      </div>
    </ModalPortal>
  );
};

export default DeleteMemberModal;
