import Button from '@components/common/Button';
import PageLayout from '@components/common/PageLayout';
import OpenStudyCard, {
  MyStudyListType,
} from '@components/manage/OpenStudyCard';
import tw from 'tailwind-styled-components';

const MY_STUDY_LIST: MyStudyListType[] = [
  {
    id: 1,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
  {
    id: 2,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
  {
    id: 3,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
  {
    id: 4,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
  {
    id: 5,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
  {
    id: 6,
    title: '스터디명스터디명스터디명스터디명',
    category: ['Frontend', 'Backend', 'interview'],
    personnel: 5,
    study_period: '2023.01.01 - 2023.02.02',
    recruitment_period: '2023.01.01 - 2023.02.02',
  },
];

const StudyManage = () => {
  return (
    <PageLayout>
      <TitleArea>
        <Title>개설한 스터디</Title>
      </TitleArea>
      {MY_STUDY_LIST.length > 0 ? (
        <StudyList>
          {MY_STUDY_LIST.map(
            ({
              id,
              title,
              category,
              personnel,
              study_period,
              recruitment_period,
            }) => (
              <OpenStudyCard
                key={id}
                id={id}
                title={title}
                category={category}
                personnel={personnel}
                study_period={study_period}
                recruitment_period={recruitment_period}
              />
            ),
          )}
          <Button className="w-[134px] h-9 mb-4" text="스터디 개설하기" />
        </StudyList>
      ) : (
        <>
          <div className="flex h-[70vh] items-center justify-center ">
            <span className="text-center text-[#8A8A8A]">
              등록한 과제가 없습니다. <br /> 새로운 과제를 등록해보세요!
            </span>
          </div>
          <div className="flex justify-center">
            <Button className="w-[134px] h-9" text="스터디 개설하기" />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default StudyManage;

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
