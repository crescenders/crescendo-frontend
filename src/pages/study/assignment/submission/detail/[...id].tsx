import { useRouter } from 'next/router';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import SubmissionDetailContent from '@components/detail/SubmissionDetailContent';
import Loader from '@components/common/Loader';
import AsyncBoundary from '@components/async/AsyncBoundary';

const SubmissionDetail = () => {
  const router = useRouter();
  const [uuid] = (router.query.id as string[]) || [''];

  return (
    <PageLayout>
      <MenuBar
        focusedPosition="center"
        leftText="정보 보기"
        centerText="과제 보기"
        rightText="멤버 보기"
        leftPath={`/study/detail/${uuid}`}
        centerPath={`/study/assignment/${uuid}`}
        rightPath={`/study/member/${uuid}`}
      />
      <AsyncBoundary suspenseFallback={<Loader />}>
        <SubmissionDetailContent />
      </AsyncBoundary>
    </PageLayout>
  );
};

export default SubmissionDetail;
