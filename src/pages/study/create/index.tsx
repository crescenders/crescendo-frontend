import { useRouter } from 'next/router';
import PageLayout from '@components/common/PageLayout';
import StudyForm from '@components/form/StudyForm';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { useCreateStudy } from '@hooks/mutations/useCreateStudy';

const CreateStudy = () => {
  const router = useRouter();
  const { mutate: createStudy, isPending } = useCreateStudy();

  return (
    <PageLayout>
      {isPending ? (
        <Loader isFull />
      ) : (
        <div className="mb-[40px] mt-[90px] flex items-center justify-center pb-[34px]">
          <div className="flex flex-col items-center justify-center gap-[34px]">
            <StudyForm onSubmit={createStudy} />
            <div className="flex gap-3 self-end">
              <Button
                isNormal
                type="button"
                text="취소"
                className="h-[40px] w-[60px]"
                onClick={() => router.back()}
              />
              <Button
                form="study"
                text="글 등록"
                className="h-[40px] w-[80px]"
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CreateStudy;
