import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteStudy } from '@hooks/mutations/useDeleteStudy';
import useModal from '@hooks/useModal';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

export type MyStudyListType = {
  uuid: string;
  postTitle: string;
  categories: string[];
  memberLimit: number;
  isClosed: boolean;
  studyPeriod: string;
  recruitmentPeriod: string;
};

const OpenStudyCard = ({
  uuid,
  postTitle,
  categories,
  memberLimit,
  isClosed,
  studyPeriod,
  recruitmentPeriod,
}: MyStudyListType) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { mutate: deleteStudy } = useDeleteStudy();

  return (
    <StudyCard
      onClick={() => router.push(`/study/manage/assignment/${uuid}`)}
      className="cursor-pointer"
    >
      <div className="flex w-full justify-between gap-x-1">
        <div className="shrink truncate whitespace-nowrap text-[17px]">
          {postTitle}
        </div>
        <div className="mr-2 flex items-center gap-x-0.5">
          <Image src="/svg/person.svg" width={18} height={18} alt="인원" />
          <span className="text-12">{memberLimit}</span>
        </div>
      </div>
      <div className="mt-[11px] flex gap-x-2 text-12 ">
        {categories?.map((category, idx) => (
          <span key={idx}>{category}</span>
        ))}
      </div>
      <div className="mt-11 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-12 text-text-secondary">
            스터디 기간 {studyPeriod}
          </span>
          <span className="flex gap-x-2">
            <span className="text-12 text-text-secondary">
              모집 기간 {recruitmentPeriod}
            </span>
            {isClosed && (
              <span className="text-12 font-bold text-status-error">마감</span>
            )}
          </span>
        </div>
        <Image
          src="/svg/trashcan.svg"
          width={40}
          height={40}
          alt="삭제"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openModal(
              <DeleteModal
                handleClick={() => {
                  deleteStudy(uuid);
                  closeModal();
                }}
                title="스터디 삭제"
                firstText="삭제한 스터디는 복구할 수 없어요."
                secondText="그래도 삭제를 진행하시겠어요?"
              />,
            );
          }}
        />
      </div>
    </StudyCard>
  );
};

export default OpenStudyCard;

const StudyCard = tw.div`
  shadow-studyCard
  flex
  h-[171px]
  w-[445px]
  flex-col
  justify-between
  rounded-[20px]
  bg-white
  p-5
`;
