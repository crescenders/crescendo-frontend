import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export type AssignmentListType = {
  id?: number;
  week: number;
  period: string;
  content: string;
  initialFolding?: boolean;
};

const AssignmentCard = ({
  week,
  period,
  content,
  initialFolding,
}: AssignmentListType) => {
  const [isFold, setIsFold] = useState(true);
  useEffect(() => {
    if (initialFolding === false) {
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
        <StudyCard className="pb-8">
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
  pt-8
`;
