import { userState } from '@recoil/auth';
import { formatUTC } from '@utils/formatUTC';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

type AssignmentListProps = {
  id: number;
  title: string;
  content: string;
  period: string;
};

const AssignmentCard = ({
  id,
  title,
  content,
  period,
}: AssignmentListProps) => {
  const { username } = useRecoilValue(userState);
  const router = useRouter();
  const uuid = String(router.query.id);

  return (
    <li
      onClick={() => {
        username && router.push(`/study/assignment/detail/${uuid}/${id}`);
      }}
      className="flex h-[236px] w-full max-w-[544px] cursor-pointer list-none flex-col overflow-hidden rounded-[20px] bg-white p-7 shadow-studyCard"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-sm md:text-base font-bold text-text-secondary">
          {title}
        </h1>
        <span
          onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            router.push(`/study/assignment/submission/${uuid}/${id}`);
          }}
          className="flex cursor-pointer items-end whitespace-nowrap text-xs sm:text-13 text-text-secondary"
        >
          과제 제출 목록
        </span>
      </div>
      <p className="mt-[52px]">{content}</p>
      <span className="flex h-full items-end justify-end text-12 font-bold text-text-primary">
        {formatUTC(period, true)}
      </span>
    </li>
  );
};

export default AssignmentCard;
