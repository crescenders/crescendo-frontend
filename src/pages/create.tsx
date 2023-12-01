import { useRouter } from 'next/router';
import PageLayout from '@components/common/PageLayout';
import StudyForm from '@components/form/StudyForm';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { useCreateStudy } from '@hooks/mutations/useCreateStudy';
import { useResetRecoilState } from 'recoil';
import { calendarOpenState } from '@recoil/calendar';

const CreateStudy = () => {
  const router = useRouter();
  const { mutate: createStudy, isPending } = useCreateStudy();
  const closeCalendar = useResetRecoilState(calendarOpenState);

  return (
    <PageLayout>
      {isPending ? (
        <Loader isFull />
      ) : (
        <div
          className="mb-[40px] mt-[90px] flex items-center justify-center pb-[34px]"
          onClick={closeCalendar}
        >
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
