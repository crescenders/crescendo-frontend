import Button from '@components/common/Button';
import BasicModal from '@components/modal/BasicModal';
import DeleteModal from '@components/modal/DeleteModal';
import Image from 'next/image';
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
  const [isModal, setIsModal] = useState<boolean>(false);
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
            <div className="flex items-center ">
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
                onClick={() => setIsModal(true)}
              />
            </ButtonWrapper>
          )}
          {isEdit && (
            <ButtonWrapper>
              <Button
                text="과제 수정"
                className="w-[75px] h-[34px]"
                onClick={() => setIsModal(true)}
              />
            </ButtonWrapper>
          )}
          {isDelete && (
            <ButtonWrapper>
              <Button
                text="삭제하기"
                className="w-[75px] h-[34px]"
                onClick={() => setIsModal(true)}
              />
            </ButtonWrapper>
          )}
        </StudyCard>
      )}
      {isModal &&
        (isSubmit ? (
          <BasicModal
            className="px-[38px] pt-[26px]"
            isPurple
            isButton
            isOpen={isModal}
            handleClose={() => setIsModal(false)}
            title="과제 제출"
            handleClick={() => alert('제출')}
          >
            <InputContainer>
              <Image
                src="/svg/link.svg"
                width={18}
                height={18}
                alt="링크"
                className="relative left-9"
              />
              <InputBox
                type="url"
                required
                placeholder="링크를 입력해주세요."
              />
            </InputContainer>
          </BasicModal>
        ) : isEdit ? (
          <BasicModal
            className="px-[38px] pt-[26px]"
            isPurple
            isButton
            isOpen={isModal}
            handleClose={() => setIsModal(false)}
            title="과제 수정"
            handleClick={() => alert('제출')}
          >
            <InputContainer>
              <Image
                src="/svg/link.svg"
                width={18}
                height={18}
                alt="링크"
                className="relative left-9"
              />
              <InputBox
                type="url"
                required
                placeholder="링크를 입력해주세요."
              />
            </InputContainer>
            <div className="flex justify-end">
              <Button text="수정" className="w-[52px] h-[29px]" />
            </div>
          </BasicModal>
        ) : isDelete ? (
          <DeleteModal
            isOpen={isModal}
            handleClose={() => setIsModal(false)}
            handleClick={() => alert('삭제')}
            title="과제 삭제"
            firstText="삭제한 결과는 복구할 수 없어요."
            secondText="삭제 진행하시겠어요?"
          />
        ) : null)}
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

const InputContainer = tw.div`
  mb-2
  mt-[61px]
  flex
  items-center
`;

const InputBox = tw.input`
  text-14
  h-12
  w-[340px]
  rounded-lg
  border-[1px]
  border-[#E1E6F9]
  bg-white
  px-12
`;
