import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useRouter } from 'next/router';
import StudyDetailContent from '@components/detail/StudyDetailContent';
import StudyDetailSkeleton from '@components/skeleton/StudyDetailSkeleton';
import ClientSuspense from '@components/common/ClientSuspense';

const StudyDetail = () => {
  const router = useRouter();
  const id = String(router.query.id);

  return (
    <PageLayout>
      <div className="mt-[105px] flex justify-center">
        <MenuBar
          focusedPosition="left"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          centerPath={`/study/assignment/${id}`}
          rightPath={`/study/member/${id}`}
        />
      </div>
      <ClientSuspense fallback={<StudyDetailSkeleton />}>
        <StudyDetailContent />
      </ClientSuspense>
    </PageLayout>
  );
};

export default StudyDetail;
