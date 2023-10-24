import tw from 'tailwind-styled-components';
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
      <MenuWrapper>
        <MenuBar
          focusedPosition="right"
          leftText="정보 보기"
          centerText="과제 보기"
          rightText="멤버 보기"
          leftPath={`/study/detail/${id}`}
          centerPath={`/study/assignment/${id}`}
        />
      </MenuWrapper>
      <StudyTitle>{study.post_title}</StudyTitle>
      <div className="flex grow flex-wrap items-center justify-evenly gap-x-[70px] gap-y-[50px] py-[50px]">
        <Card
          className="bg-[#F7B12A]"
          onClick={() => openModal(<MemberModal title="스터디원 목록" />)}
        >
          <Icon>
            <Image src="/svg/emoji_members.svg" width={60} height={60} alt="" />
          </Icon>
          <InnerCard>스터디원 목록</InnerCard>
        </Card>
        {study.leaders[0].uuid === uuid && (
          <Card
            className="bg-[#33C954]"
            onClick={() => openModal(<MemberModal title="참여 신청자" />)}
          >
            <Icon>
              <Image src="/svg/emoji_inbox.svg" width={60} height={60} alt="" />
            </Icon>
            <InnerCard>참여 신청자 목록</InnerCard>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Member;

const MenuWrapper = tw.div`
  mt-[105px]
  flex
  justify-center
`;

const StudyTitle = tw.div`
  text-24
  mt-9
  max-w-[600px]
  cursor-default
  text-center
  font-bold
`;

const Card = tw.div`
  bg-brand
  shadow-button
  flex
  h-[374px]
  w-[265px]
  cursor-pointer
  select-none
  flex-col
  justify-between
  rounded-2xl
  p-5
  duration-500
  hover:scale-105
`;

const InnerCard = tw.div`
  rounded-2xl
  bg-white/20
  px-5
  py-10
  text-center
  text-2xl
  font-bold
  text-white
`;

const Icon = tw.div`
  flex
  grow
  items-center
  justify-center
`;
