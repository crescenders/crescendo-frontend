import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteStudy } from '@hooks/mutations/useDeleteStudy';
import useModal from '@hooks/useModal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

export type MyStudyListType = {
  id: string;
  title: string;
  category: string[];
  personnel: number;
  isClosed: boolean;
  study_period: string;
  recruitment_period: string;
};

const OpenStudyCard = ({
  id,
  title,
  category,
  personnel,
  isClosed,
  study_period,
  recruitment_period,
}: MyStudyListType) => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { mutate: deleteStudy } = useDeleteStudy();

  return (
    <StudyCard
      onClick={() => router.push(`/study/manage/assignment/${id}`)}
      className="cursor-pointer"
    >
      <div className="flex w-[100%] justify-between gap-x-1">
        <div className="shrink truncate whitespace-nowrap text-[17px]">
          {title}
        </div>
        <div className="mr-2 flex items-center gap-x-0.5">
          <Image src="/svg/person.svg" width={18} height={18} alt="인원" />
          <span className="text-12">{personnel}</span>
        </div>
      </div>
      <div className="mt-[11px] flex gap-x-2 text-12 ">
        {category.map((category, idx) => (
          <span key={idx}>{category}</span>
        ))}
      </div>
      <div className="mt-11 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-12 text-text-secondary">
            스터디 기간 {study_period}
          </span>
          <span className="flex gap-x-2">
            <span className="text-12 text-text-secondary">
              모집 기간 {recruitment_period}
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
                  deleteStudy(id);
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
