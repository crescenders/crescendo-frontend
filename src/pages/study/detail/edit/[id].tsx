import { useRouter } from 'next/router';
import PageLayout from '@components/common/PageLayout';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import StudyForm from '@components/form/StudyForm';
import { useEditStudy } from '@hooks/mutations/useEditStudy';

const EditStudy = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { mutate: editStudy, isPending } = useEditStudy();

  return (
    <PageLayout>
      {isPending ? (
        <Loader isFull />
      ) : (
        <div className="mb-[40px] mt-[90px] flex items-center justify-center pb-[34px]">
          <div className="flex flex-col items-center justify-center gap-[34px]">
            <StudyForm
              id={id}
              onSubmit={(formData: FormData) => editStudy({ id, formData })}
            />
            <div className="flex gap-3 self-end">
              <Button
                isNormal
                type="button"
                text="취소"
                className="h-[40px] w-[60px]"
                onClick={() => router.replace(`/study/detail/${id}`)}
              />
              <Button
                form="study"
                text="글 수정"
                className="h-[40px] w-[80px]"
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default EditStudy;
