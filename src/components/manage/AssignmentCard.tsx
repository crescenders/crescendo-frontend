import Button from '@components/common/Button';
import DeleteModal from '@components/modal/DeleteModal';
import EditModal from '@components/modal/EditModal';
import SubmitModal from '@components/modal/SubmitModal';
import useModal from '@hooks/useModal';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

type AssignmentListProps = {
  week: number;
  period: string;
  content: string;
  isInitialFold?: boolean;
  isSubmit?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
};

const AssignmentCard = ({
  week,
  period,
  content,
  isInitialFold,
  isSubmit,
  isEdit,
  isDelete,
}: AssignmentListProps) => {
  const [isFold, setIsFold] = useState(true);
  const { openModal } = useModal();
  useEffect(() => {
    if (isInitialFold === false) {
      setIsFold(false);
    }
  }, []);

  return (
    <>
      {isFold ? (
        <StudyCard className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold text-brand text-17">
                {week}주차 과제
              </span>
              <span className="text-status-error text-13 font-medium ml-4">
                제출 기간 {period}
              </span>
            </div>
            <span
              className="cursor-pointer text-13"
              onClick={() => setIsFold(false)}
            >
              펼치기
            </span>
          </div>
        </StudyCard>
      ) : (
        <StudyCard>
          <div className="flex justify-between items-center mb-[60px]">
            <div className="flex flex-col gap-y-1">
              <span className="font-bold text-brand text-17">
                {week}주차 과제
              </span>
              <span className="text-status-error text-13 font-medium">
                제출 기간 {period}
              </span>
            </div>
            <span
              className="cursor-pointer text-13"
              onClick={() => setIsFold(true)}
            >
              접기
            </span>
          </div>
          <span>{content}</span>
          {isSubmit && (
            <ButtonWrapper>
              <Button
                text="과제 제출"
                className="w-[75px] h-[34px]"
                onClick={() =>
                  openModal(
                    <SubmitModal handleClick={() => console.log('click')} />,
                  )
                }
              />
            </ButtonWrapper>
          )}
          {isEdit && (
            <ButtonWrapper>
              <Button
                text="과제 수정"
                className="w-[75px] h-[34px]"
                onClick={() =>
                  openModal(
                    <EditModal handleClick={() => console.log('click')} />,
                  )
                }
              />
            </ButtonWrapper>
          )}
          {isDelete && (
            <ButtonWrapper>
              <Button
                text="삭제하기"
                className="w-[75px] h-[34px]"
                onClick={() =>
                  openModal(
                    <DeleteModal
                      handleClick={() => alert('삭제')}
                      title="과제 삭제"
                      firstText="삭제한 결과는 복구할 수 없어요."
                      secondText="삭제 진행하시겠어요?"
                    />,
                  )
                }
              />
            </ButtonWrapper>
          )}
        </StudyCard>
      )}
    </>
  );
};

export default AssignmentCard;

const StudyCard = tw.div`
  shadow-studyCard
  h-fit
  w-[544px]
  rounded-[20px]
  bg-white
  px-8
  py-8
`;

const ButtonWrapper = tw.div`
  mt-[35px]
  flex
  justify-end
`;
