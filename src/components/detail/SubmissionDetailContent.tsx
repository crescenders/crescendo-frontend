import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import DropBox from '@components/common/DropBox';
import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteSubmissionDetail } from '@hooks/mutations/useDeleteSubmission';
import { useSuspenseGetSubmissionDetail } from '@hooks/queries/useGetSubmission';
import useModal from '@hooks/useModal';
import { userState } from '@recoil/auth';
import { formatUTC } from '@utils/formatUTC';

const SubmissionDetailContent = () => {
  const router = useRouter();
  const [uuid, assignmentId, submissionId] =
    (router.query.id as string[]) || [];
  const { uuid: userId } = useRecoilValue(userState);
  const { openModal, closeModal } = useModal();
  const { mutate } = useDeleteSubmissionDetail();
  const { data } = useSuspenseGetSubmissionDetail(
    uuid,
    Number(assignmentId),
    Number(submissionId),
  );

  const topEvent = () => {
    router.push(
      `/study/assignment/submission/edit/${uuid}/${assignmentId}/${submissionId}`,
    );
  };

  const BottomEvent = () => {
    openModal(
      <DeleteModal
        handleClick={() => {
          mutate({
            uuid,
            assignmentId: Number(assignmentId),
            submissionId: Number(submissionId),
          });
          closeModal();
        }}
        title="과제 삭제"
        firstText="삭제한 결과는 복구할 수 없어요."
        secondText="그래도 삭제를 진행하시겠어요?"
      />,
    );
  };

  return (
    <div className="mx-auto my-0 mt-16 w-full max-w-2xl">
      <h1 className="mb-[14px] text-[24px] font-bold text-text-tertiary">
        {data?.title}
      </h1>
      <div className="flex h-10 items-center justify-between pr-3">
        <span className="font-medium text-text-primary">
          {data?.author.username} | {formatUTC(data?.created_at as string)}
        </span>
        {userId === data?.author.uuid && (
          <DropBox topEvent={topEvent} bottomEvent={BottomEvent} />
        )}
      </div>
      <div className="mb-10 mt-[7px] h-[0.2px] w-full bg-text-primary" />
      <div
        className="prose mb-10"
        dangerouslySetInnerHTML={{
          __html: data?.content as string,
        }}
      />
    </div>
  );
};

export default SubmissionDetailContent;