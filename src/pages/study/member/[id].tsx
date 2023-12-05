import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import useModal from '@hooks/useModal';
import MemberModal from '@components/modal/MemberModal';
import Image from 'next/image';

const Member = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { uuid } = useRecoilValue(userState);
  const { openModal } = useModal();
  const { data: study } = useGetStudyDetail(id);

  return (
    <PageLayout className="items-center">
      <MenuBar
        focusedPosition="right"
        leftText="정보 보기"
        centerText="과제 보기"
        rightText="멤버 보기"
        leftPath={`/study/detail/${id}`}
        centerPath={`/study/assignment/${id}`}
      />
      <h1 className="mt-9 max-w-[600px] cursor-default text-center text-24 font-bold">
        {study?.post_title}
      </h1>
      <div className="flex grow flex-wrap items-center justify-evenly gap-x-[70px] gap-y-[50px] py-[50px]">
        <div
          className="flex h-[374px] w-[265px] cursor-pointer select-none flex-col justify-between rounded-2xl bg-[#F7B12A] p-5 shadow-button duration-500 hover:scale-105"
          onClick={() =>
            uuid && openModal(<MemberModal title="스터디원 목록" />)
          }
        >
          <div className="flex grow items-center justify-center">
            <Image src="/svg/emoji_members.svg" width={60} height={60} alt="" />
          </div>
          <div className="rounded-2xl bg-white/20 px-5 py-10 text-center text-2xl font-bold text-white">
            스터디원 목록
          </div>
        </div>
        {study?.leaders[0].uuid === uuid && (
          <div
            className="flex h-[374px] w-[265px] cursor-pointer select-none flex-col justify-between rounded-2xl bg-[#33C954] p-5 shadow-button duration-500 hover:scale-105"
            onClick={() => openModal(<MemberModal title="참여 신청자" />)}
          >
            <div className="flex grow items-center justify-center">
              <Image src="/svg/emoji_inbox.svg" width={60} height={60} alt="" />
            </div>
            <div className="rounded-2xl bg-white/20 px-5 py-10 text-center text-2xl font-bold text-white">
              참여 신청자 목록
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Member;