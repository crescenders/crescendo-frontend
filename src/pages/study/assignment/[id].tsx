import Button from '@components/common/Button';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import ProgressBar from '@components/common/ProgressBar';
import AssignmentCard from '@components/manage/AssignmentCard';
import { useGetAssignmentList } from '@hooks/queries/useGetAssignment';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import { userState } from '@recoil/auth';
import { getProgress } from '@utils/getProgress';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

const Assignment = () => {
  const router = useRouter();
  const uuid = String(router.query.id);
  const { uuid: userId } = useRecoilValue(userState);
  const { data: study } = useGetStudyDetail(uuid);
  const { data: assignment } = useGetAssignmentList(uuid);

  const progress = getProgress(study.start_date, study.end_date);

  const handleRegisterButton = () => {
    if (userId === study.leaders[0].uuid)
      router.push(`/study/assignment/register/${uuid}`);
  };

  return (
    <PageLayout>
      <MenuWrapper>
        <MenuBar
          focusedPosition="center"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${uuid}`}
          rightPath={`/study/member/${uuid}`}
        />
      </MenuWrapper>
      <StudyTitle>{study.study_name}</StudyTitle>
      {assignment && assignment.results.length > 0 ? (
        <>
          <div className="mt-14 flex flex-col items-center gap-y-2">
            <ProgressBar progress={progress} />
            {progress !== 100 && (
              <span className="text-14 font-bold">
                목표까지
                <span className="text-brand">{` ${100 - progress}`}% </span>
                남았어요!
              </span>
            )}
          </div>
          <AssignmentList>
            {assignment.results.map(({ id, title, content, created_at }) => (
              <AssignmentCard
                key={id}
                id={id}
                title={title}
                period={created_at}
                content={content}
              />
            ))}
            <Button
              text="과제 등록하기"
              className="fixed bottom-11 h-9 w-[143px]"
              onClick={handleRegisterButton}
            />
          </AssignmentList>
        </>
      ) : (
        <>
          <div className="flex h-[30vh] items-center justify-center">
            <span className="whitespace-pre-wrap text-center text-16 text-text-primary">
              {`등록한 과제가 없습니다.\n새로운 과제를 등록해보세요!`}
            </span>
          </div>
          <div className="flex justify-center">
            <Button
              text="과제 등록하기"
              className="fixed bottom-11 h-9 w-[143px]"
              onClick={handleRegisterButton}
            />
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Assignment;

const StudyTitle = tw.h1`
  text-text-secondary
  mx-8
  mb-[23px]
  mt-9
  text-center
  text-[24px]
  font-bold
`;

const AssignmentList = tw.ul`
  mb-20
  mt-[47px]
  flex
  flex-col
  items-center
  gap-y-5
`;

const Container = tw.div`
  flex
  flex-col
  items-center
`;

const MenuWrapper = tw.div`
  mt-[105px]
  flex
  justify-center
`;
