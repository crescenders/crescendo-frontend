import Button from '@components/common/Button';
import PageLayout from '@components/common/PageLayout';
import AssignmentCard from '@components/manage/AssignmentCard';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

export type AssignmentListType = {
  id: number;
  week: number;
  period: string;
  content: string;
};

const ASSIGNMENT_LIST: AssignmentListType[] = [
  {
    id: 1,
    week: 1,
    period: '2023.01.01 - 2023.02.02',
    content: '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
  },
  {
    id: 2,
    week: 2,
    period: '2023.01.01 - 2023.02.02',
    content: '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
  },
  {
    id: 3,
    week: 3,
    period: '2023.01.01 - 2023.02.02',
    content: '과제설명과제설명과제설명과제설명과제설명과제설명과제설명과제설명',
  },
];

const Assignment = () => {
  return (
    <PageLayout>
      <TitleArea>
        <Title>등록한 과제</Title>
      </TitleArea>
      <div className="flex gap-x-1 text-13 text-text-secondary justify-end mr-[202px] mt-2 cursor-pointer">
        <span>참여 신청자 | </span>
        <span>스터디원 관리</span>
      </div>
      {ASSIGNMENT_LIST.length > 0 ? (
        ASSIGNMENT_LIST.length < 3 ? (
          <StudyList>
            {ASSIGNMENT_LIST.map(({ id, week, period, content }) => (
              <AssignmentCard
                key={id}
                week={week}
                period={period}
                content={content}
                isInitialFold={false}
              />
            ))}
            <Button className="w-[134px] h-9 mb-4 mt-9" text="과제 등록하기" />
          </StudyList>
        ) : (
          <StudyList>
            {ASSIGNMENT_LIST.map(({ id, week, period, content }) => (
              <AssignmentCard
                key={id}
                week={week}
                period={period}
                content={content}
              />
            ))}
            <Button className="w-[134px] h-9 mb-4 mt-9" text="과제 등록하기" />
          </StudyList>
        )
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <RegisterBox onClick={() => alert('과제 등록하기')}>
            <Image
              src={'/svg/plus.svg'}
              width={24}
              height={24}
              alt="과제 등록하기"
            />
            <span className="text-14 text-text-secondary">과제 등록하기</span>
          </RegisterBox>
        </div>
      )}
    </PageLayout>
  );
};

export default Assignment;

const Title = tw.span`
  text-20
  font-bold
`;

const TitleArea = tw.div`
  ml-48
  mt-[125px]
`;

const StudyList = tw.div`
  mt-5
  flex
  flex-col
  items-center
  gap-y-5
`;

const RegisterBox = tw.div`
  border-dark
  flex
  h-[189px]
  w-[621px]
  cursor-pointer
  flex-col
  items-center
  justify-center
  gap-y-[9px]
  rounded-lg
  border-[2px]
  border-dashed
  bg-white
`;
