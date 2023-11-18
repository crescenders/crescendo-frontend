import Button from '@components/common/Button';
import Input from '@components/common/Input';
import PageLayout from '@components/common/PageLayout';
import TextArea from '@components/common/TextArea';
import { useEditAssignmentDetail } from '@hooks/mutations/useEditAssignment';
import { useGetAssignmentDetail } from '@hooks/queries/useGetAssignment';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const Edit = () => {
  const router = useRouter();
  const [uuid, id] = (router.query.id as string[]) || [];

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { data: assignment } = useGetAssignmentDetail(uuid, Number(id));
  const { mutate } = useEditAssignmentDetail();

  const handleRegisterButton = () => {
    if (!titleRef.current || !contentRef.current) return;

    const { value: title } = titleRef.current;
    const { value: content } = contentRef.current;

    mutate({ id: Number(id), uuid, title, content });
  };

  return (
    <PageLayout>
      <div className="mt-[150px] flex flex-col items-center px-7">
        <div className="flex w-full max-w-[550px] flex-col gap-y-9">
          <Input
            ref={titleRef}
            label="제목을 입력해주세요."
            id="title-input"
            variant="large"
            required
            className="w-full"
            defaultValue={assignment?.title}
          />
          <TextArea
            ref={contentRef}
            placeholder="과제에 대해 설명해주세요!"
            className="min-h-[420px] w-full"
            defaultValue={assignment?.content}
          />
          <div className="mb-12 flex justify-end gap-x-[10px]">
            <Button
              text="취소"
              isNormal
              className="h-9 w-[61px]"
              onClick={() => router.back()}
            />
            <Button
              text="글 등록"
              className="h-9 w-[82px]"
              onClick={handleRegisterButton}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Edit;
