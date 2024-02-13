import { useRef } from 'react';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
import PageLayout from '@components/common/PageLayout';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import TextEditor from '@components/editor/TextEditor';
import { usePostSubmission } from '@hooks/mutations/usePostSubmission';
import { useToast } from '@providers/ToastProvider';

const SubmitSubmission = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<ReactQuill>(null);
  const [uuid, assignmnetId] = (router.query.id as string[]) || [];
  const { mutate } = usePostSubmission();
  const { showToast } = useToast();

  const handleSubmitButton = () => {
    if (!titleRef.current || !contentRef.current) return;

    const id = Number(assignmnetId);
    const title = titleRef.current.value;
    const content = String(contentRef.current.value);

    if (!title.length || !content.length) {
      showToast({
        type: 'fail',
        message: '내용을 모두 입력해주세요.',
      });
      return;
    }
    mutate({ uuid, id, title, content });
  };

  return (
    <PageLayout>
      <div className="flex min-h-full flex-col items-center px-7 pt-[100px]">
        <div className="my-auto flex w-full max-w-[550px] flex-col gap-y-9">
          <Input
            ref={titleRef}
            label="제목을 입력해주세요."
            id="title-input"
            variant="large"
            required
          />
          <TextEditor
            ref={contentRef}
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
              text="과제 제출"
              className="h-9 w-[88px]"
              onClick={handleSubmitButton}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SubmitSubmission;
