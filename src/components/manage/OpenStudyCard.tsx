import DeleteModal from '@components/modal/DeleteModal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

export type MyStudyListType = {
  id: number;
  title: string;
  category: string[];
  personnel: number;
  study_period: string;
  recruitment_period: string;
};

const OpenStudyCard = ({
  id,
  title,
  category,
  personnel,
  study_period,
  recruitment_period,
}: MyStudyListType) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <StudyCard>
      <div className="flex justify-between">
        <Link href={`/studymanage/assignment/${id}`}>
          <span className="text-[17px]">{title}</span>
        </Link>
        <div className="flex items-center gap-x-0.5 mr-2">
          <Image src="/svg/person.svg" width={18} height={18} alt="인원" />
          <span className="text-12">{personnel}</span>
        </div>
      </div>
      <div className="flex gap-x-2 text-12 mt-[11px]">
        {category.map((category, idx) => (
          <span key={idx}>{category}</span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-11">
        <div className="flex flex-col">
          <span className="text-12 text-text-secondary">
            스터디 기간 {study_period}
          </span>
          <span className="text-12 text-text-secondary">
            모집 기간 {recruitment_period}
          </span>
        </div>
        <Image
          src="/svg/trashcan.svg"
          width={40}
          height={40}
          alt="삭제"
          className="cursor-pointer"
          onClick={() => setIsModal(true)}
        />
      </div>
      {isModal && (
        <DeleteModal
          isOpen={isModal}
          handleClose={() => setIsModal(false)}
          handleClick={() => alert('삭제')}
          title="스터디 삭제"
          firstText="삭제한 스터디는 복구할 수 없어요."
          secondText="삭제 진행하시겠어요?"
        />
      )}
    </StudyCard>
  );
};

export default OpenStudyCard;

const StudyCard = tw.div`
  shadow-studyCard
  h-[171px]
  w-[445px]
  rounded-[20px]
  bg-white
  p-5
`;
