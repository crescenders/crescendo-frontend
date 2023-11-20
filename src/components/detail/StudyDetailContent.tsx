import DropBox from '@components/common/DropBox';
import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteStudy } from '@hooks/mutations/useDeleteStudy';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import useModal from '@hooks/useModal';
import { userState } from '@recoil/auth';
import { formatUTC } from '@utils/formatUTC';
import { getProgress } from '@utils/getProgress';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import useIsMounted from '@hooks/useIsMounted';

const StudyDetailContent = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { uuid } = useRecoilValue(userState);
  const { openModal, closeModal } = useModal();
  const { data: study } = useGetStudyDetail(id);
  const { mutate: deleteStudy } = useDeleteStudy();
  const isMounted = useIsMounted();

  const topEvent = () => {
    if (study && study.until_deadline >= 0)
      router.push(`/study/detail/edit/${id}`);
    else alert('마감된 스터디는 수정할 수 없습니다.');
  };

  const bottomEvent = () => {
    openModal(
      <DeleteModal
        handleClick={() => {
          deleteStudy(id);
          closeModal();
          router.replace(`/`);
        }}
        title="스터디 삭제"
        firstText="삭제한 결과는 복구할 수 없어요."
        secondText="그래도 삭제를 진행하시겠어요?"
      />,
    );
  };

  return (
    <>
      <div className="mx-auto my-0 mb-12 w-full max-w-2xl px-7">
        <div className="mt-[50px] flex flex-col gap-y-2">
          <h1 className="text-24 font-bold">{study?.post_title}</h1>
          <div className="flex gap-x-1">
            <span className="font-bold">
              {study?.leaders.map((v) => v.username)}
            </span>
            <span>({study?.leaders[0].email})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">
              작성일 {formatUTC(study?.created_at as string)}
            </span>
            {isMounted && uuid === study?.leaders[0].uuid && (
              <DropBox topEvent={topEvent} bottomEvent={bottomEvent} />
            )}
          </div>
          <div className="relative mt-2 h-[254px] w-full overflow-hidden rounded-lg border-[1px] border-black">
            <Image src={study?.head_image as string} fill alt="head-image" />
          </div>
          <div className="mt-7 flex gap-x-2 max-md:text-12">
            <div className="flex flex-1 flex-col gap-y-4">
              <div className="flex gap-x-1.5">
                <span className="whitespace-nowrap font-bold text-text-secondary">
                  스터디명
                </span>
                <span className="font-bold">{study?.study_name}</span>
              </div>
              <span className="whitespace-nowrap font-bold text-text-secondary">
                카테고리
              </span>
              <ul className="flex flex-wrap gap-2">
                {study?.categories.map((category) => (
                  <li
                    key={category}
                    className="flex h-fit w-fit cursor-pointer list-none items-center justify-center rounded-[7px] border-[1.5px] border-[#8266FF] bg-white px-3 py-2 text-[13px] text-[#8266FF]"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-y-4">
              <div className="flex gap-x-1.5">
                <span className="whitespace-nowrap font-bold text-text-secondary">
                  스터디 기간
                </span>
                <span className="font-bold">
                  {study?.start_date} ~ {study?.end_date}
                </span>
              </div>
              <div className="flex items-center gap-x-1.5">
                <span className="whitespace-nowrap font-bold text-text-secondary">
                  모집 기간
                </span>
                <span className="font-bold">{study?.deadline}</span>
                <span className="text-13 font-bold text-status-error">
                  {study && study.until_deadline > 0
                    ? `(D-${study.until_deadline})`
                    : '마감'}
                </span>
              </div>
              {study && study.until_deadline < 0 && (
                <div className="flex items-center gap-x-1.5">
                  <span className="whitespace-nowrap font-bold text-text-secondary">
                    진행도
                  </span>
                  <span className="font-bold">
                    {`${getProgress(study.start_date, study.end_date)}%`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 flex gap-x-1.5">
            <span className="whitespace-nowrap font-bold text-text-secondary">
              태그
            </span>
            <ul className="ml-1 flex flex-wrap gap-x-1.5 gap-y-2">
              {study?.tags.map((tag) => (
                <li
                  key={tag}
                  className="h-fit w-fit cursor-pointer rounded-full border-[1px] border-[#C8B4FF] px-3 py-1 text-13"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <span className="mb-3 mt-6 h-[0.1px] w-full bg-text-secondary opacity-30" />
          <h2 className="text-[20px] font-bold text-text-secondary">
            스터디 소개
          </h2>
          <div
            className="prose mt-10"
            dangerouslySetInnerHTML={{
              __html: study?.post_content as string,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StudyDetailContent;
