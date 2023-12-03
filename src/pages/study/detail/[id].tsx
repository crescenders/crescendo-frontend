import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';
import StudyDetailContent from '@components/detail/StudyDetailContent';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import studyApi from '@apis/study/studyApi';
import ApplyBottomSheet from '@components/detail/ApplyBottomSheet';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import useIsMounted from '@hooks/useIsMounted';

const StudyDetail = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { data: study } = useGetStudyDetail(String(router.query.id));
  const { uuid } = useRecoilValue(userState);
  const isMounted = useIsMounted();

  return (
    <PageLayout>
      <MenuBar
        focusedPosition="left"
        leftText="정보 보기"
        centerText="과제 보기"
        rightText="멤버 보기"
        centerPath={`/study/assignment/${id}`}
        rightPath={`/study/member/${id}`}
      />
      <StudyDetailContent />
      {study?.leaders[0].uuid !== uuid && isMounted && <ApplyBottomSheet />}
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = String(query.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['useGetStudyDetail', id],
    queryFn: () => studyApi.getStudyDetail(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default StudyDetail;
