import DropBox from '@components/common/DropBox';
import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteAssignmentDetail } from '@hooks/mutations/useDeleteAssignment';
import { useGetAssignmentDetail } from '@hooks/queries/useGetAssignment';
import useModal from '@hooks/useModal';
import { userState } from '@recoil/auth';
import { formatUTC } from '@utils/formatUTC';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const AssignmentDetailContent = () => {
  const router = useRouter();
  const [uuid, id] = (router.query.id as string[]) || [];
  const { uuid: userId } = useRecoilValue(userState);
  const { openModal, closeModal } = useModal();

  const { data } = useGetAssignmentDetail(String(uuid), Number(id));
  const { mutate } = useDeleteAssignmentDetail();

  const topEvent = () => {
    router.push(`/study/assignment/edit/${uuid}/${id}`);
  };

  const BottomEvent = () => {
    openModal(
      <DeleteModal
        handleClick={() => {
          mutate({ id: Number(id), uuid });
          closeModal();
          router.back();
        }}
        title="스터디 삭제"
        firstText="삭제한 결과는 복구할 수 없어요."
        secondText="그래도 삭제를 진행하시겠어요?"
      />,
    );
  };

  return (
    <div className="mt-16 w-full max-w-[640px]">
      <h1 className="mb-[14px] text-[24px] font-bold text-text-tertiary">
        {data?.title}
      </h1>
      <div className="flex justify-between pr-3">
        <span className="font-medium text-text-primary">
          {data?.author.username} | {formatUTC(data?.created_at as string)}
        </span>
        {userId === data?.author.uuid && (
          <DropBox topEvent={topEvent} bottomEvent={BottomEvent} />
        )}
      </div>
      <div className="mb-10 mt-8 h-[0.2px] w-full bg-text-primary" />
      <p className="whitespace-pre-wrap">{data?.content}</p>
    </div>
  );
};

export default AssignmentDetailContent;
