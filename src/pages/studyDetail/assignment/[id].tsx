import Button from '@components/common/Button';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ProgressBar from '@components/common/ProgressBar';
import AssignmentCard from '@components/manage/AssignmentCard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AssignmentListType } from 'pages/studymanage/assignment/[id]';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

type studyInfoType = {
  title: string;
  progress: number;
  assignments: AssignmentListType[];
};

const ASSIGNMENT_INFO: studyInfoType = {
  title: '스터디명 스터디명 스터디명',
  progress: 50,
  assignments: [
    {
      id: 1,
      week: 1,
      period: '2023.01.01 - 2023.02.02',
      content:
        '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
    },
    {
      id: 2,
      week: 2,
      period: '2023.01.01 - 2023.02.02',
      content:
        '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
    },
    {
      id: 3,
      week: 3,
      period: '2023.01.01 - 2023.02.02',
      content:
        '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
    },
  ],
};

const ViewAssiginment = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  let progress = 20;

  const router = useRouter();
  const { id } = router.query;
  return (
    <PageLayout>
      <div className="flex items-center mt-[105px] flex-col">
        <MenuBar
          focusedPosition="right"
          leftText="정보 보기"
          rightText="과제 보기"
          path={`/studyDetail/${id}`}
        />
        <StudyTitle>{ASSIGNMENT_INFO.title}</StudyTitle>
      </div>
      {ASSIGNMENT_INFO.assignments.length > 0 ? (
        <>
          <div className="flex gap-x-1 items-center ml-[249px]">
            <span className="transform scale-x-[-1] text-[28px]">🏃‍♂️</span>
            <span className="font-bold text-14 text-brand">진행도</span>
          </div>
          <div className="flex items-center flex-col gap-y-2">
            <ProgressBar progress={progress} />
            {progress !== 100 && (
              <span className="font-bold text-14">
                목표까지 {`${100 - progress}`}% 남았어요!
              </span>
            )}
          </div>
          <div className="flex justify-end mr-[240px] mt-8 cursor-pointer">
            {isEdit ? (
              <Image
                src="/svg/edit_clicked.svg"
                width={40}
                height={40}
                alt="수정"
                onClick={() => {
                  setIsEdit(false);
                  setIsDelete(false);
                }}
              />
            ) : (
              <Image
                src="/svg/edit.svg"
                width={40}
                height={40}
                alt="수정"
                onClick={() => {
                  setIsEdit(true);
                  setIsDelete(false);
                }}
              />
            )}
            {isDelete ? (
              <Image
                src="/svg/trashcan_clicked.svg"
                width={40}
                height={40}
                alt="삭제"
                onClick={() => {
                  setIsDelete(false);
                  setIsEdit(false);
                }}
              />
            ) : (
              <Image
                src="/svg/trashcan.svg"
                width={40}
                height={40}
                alt="삭제"
                onClick={() => {
                  setIsEdit(false);
                  setIsDelete(true);
                }}
              />
            )}
          </div>
          <AssignmentList>
            {ASSIGNMENT_INFO.assignments.map(
              ({ id, week, period, content }) => (
                <AssignmentCard
                  key={id}
                  week={week}
                  period={period}
                  content={content}
                  isSubmit={isSubmit}
                  isEdit={isEdit}
                  isDelete={isDelete}
                />
              ),
            )}
            <Button text="과제 등록하기" className="w-[143px] h-9" />
          </AssignmentList>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-[30vh]">
            <span className="text-center text-16 text-text-primary">
              등록한 과제가 없습니다. <br /> 새로운 과제를 등록해보세요!
            </span>
          </div>
          <div className="flex justify-center">
            <Button text="과제 등록하기" className="w-[143px] h-9" />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default ViewAssiginment;

const StudyTitle = tw.div`
  text-24
  mb-[23px]
  mt-9
  font-bold
`;

const AssignmentList = tw.div`
  mb-20
  mt-5
  flex
  flex-col
  items-center
  gap-y-5
`;
