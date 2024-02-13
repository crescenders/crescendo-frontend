import { useRef } from 'react';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
import PageLayout from '@components/common/PageLayout';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import TextEditor from '@components/editor/TextEditor';
import { useGetSubmissionDetail } from '@hooks/queries/useGetSubmission';
import {
  usePutSubmissionDetail,
  usePatchSubmissionDetail,
} from '@hooks/mutations/useEditSubmission';
import { useToast } from '@providers/ToastProvider';

const EditSubmission = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<ReactQuill>(null);
  const router = useRouter();
  const [uuid, assignmentId, submissionId] =
    (router.query.id as string[]) || [];
  const { data } = useGetSubmissionDetail(
    uuid,
    Number(assignmentId),
    Number(submissionId),
  );
  const { mutate: putSubmission } = usePutSubmissionDetail();
  const { mutate: patchSubmission } = usePatchSubmissionDetail();
  const { showToast } = useToast();

  const handleEditButton = () => {
    if (!titleRef.current || !contentRef.current) return;

    const title = titleRef.current.value;
    const content = String(contentRef.current.value);
    const id = {
      uuid,
      assignmentId: Number(assignmentId),
      submissionId: Number(submissionId),
    };

    if (!title.length || !content.length) {
      showToast({
        type: 'fail',
        message: '내용을 모두 입력해주세요.',
      });
      return;
    }
    if (data?.title === title && data?.content === content) {
      showToast({
        type: 'fail',
        message: '변경 사항이 없습니다.',
      });
      return;
    }
    if (data?.title !== title && data?.content !== content) {
      putSubmission({
        ...id,
        title,
        content,
      });
      return;
    }
    patchSubmission({
      ...id,
      data: data.title === title ? { content } : { title },
    });
  };

  return (
    <PageLayout>
      <div className="flex min-h-full flex-col items-center px-7 pt-[100px]">
        <div className="my-auto flex w-full max-w-[550px] flex-col gap-y-9">
          <Input
            ref={titleRef}
            defaultValue={data?.title}
            label="제목을 입력해주세요."
            id="title-input"
            variant="large"
            required
          />
          <TextEditor
            ref={contentRef}
            defaultValue={data?.content}
            className="w-full [&>.ql-container]:h-[400px]"
            placeholder="과제에 대해 설명해주세요!"
          />
          <div className="flex justify-end gap-x-[10px] pb-10">
            <Button
              text="취소"
              isNormal
              className="h-9 w-[61px]"
              onClick={() => router.back()}
            />
            <Button
              text="과제 수정"
              className="h-9 w-[88px]"
              onClick={handleEditButton}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditSubmission;
