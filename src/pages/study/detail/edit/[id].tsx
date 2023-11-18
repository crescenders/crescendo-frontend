import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import PageLayout from '@components/common/PageLayout';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import StudyForm from '@components/form/StudyForm';
import { useEditStudy } from '@hooks/mutations/useEditStudy';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import useToast from '@hooks/useToast';

const EditStudy = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { showToast } = useToast();
  const { uuid } = useRecoilValue(userState);
  const { data: study } = useGetStudyDetail(id);
  const { mutate: editStudy, isPending } = useEditStudy();

  useEffect(() => {
    if (study?.is_closed || uuid !== study?.leaders[0].uuid) {
      router.replace(`/study/detail/${id}`);
      showToast({
        type: 'fail',
        message:
          uuid !== study?.leaders[0].uuid
            ? '작성자만 수정 가능합니다.'
            : '마감된 스터디는 수정할 수 없습니다.',
      });
    }
  }, []);

  if (study?.is_closed || uuid !== study?.leaders[0].uuid) return null;

  return (
    <PageLayout>
      {isPending ? (
        <Loader isFull />
      ) : (
        <div className="mb-[40px] mt-[90px] flex items-center justify-center pb-[34px]">
          <div className="flex flex-col items-center justify-center gap-[34px]">
            <StudyForm
              study={study}
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
