import { useGetStudyDetail } from '@hooks/queries/useGetStudy';
import { formatUTC } from '@utils/formatUTC';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';
import getDiffDate from 'utils/getDiffDate';

const StudyDetailContent = () => {
  const router = useRouter();
  const id = String(router.query.id);
  const { data: study } = useGetStudyDetail(id);

  return (
    <div className="mb-12 w-full px-[200px]">
      <div className="mt-[50px] flex flex-col gap-y-2">
        <Title>{study?.post_title}</Title>
        <div className="flex gap-x-1">
          <BoldText>{study?.leaders.map((v) => v.username)}</BoldText>
          <span>(user@email.com)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">
            작성일 {formatUTC(study?.created_at as string)}
          </span>
          <div className="flex cursor-pointer gap-x-1 text-14">
            <span>수정 /</span>
            <span>삭제</span>
          </div>
        </div>
        <ImageBox>
          {
            <Image
              src={study?.head_image as string}
              fill
              alt="head-image"
              className="object-contain"
            />
          }
        </ImageBox>
        <InfoTextContainer>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-1.5 text-18">
              <GrayText>스터디명</GrayText>
              <BoldText>{study?.study_name}</BoldText>
            </div>
            <GrayText>카테고리</GrayText>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-1.5">
              <GrayText>스터디 기간</GrayText>
              <BoldText>
                {study?.start_date} ~ {study?.end_date}
              </BoldText>
            </div>
            <div className="flex items-center gap-x-1.5">
              <GrayText>모집 기간</GrayText>
              <BoldText>{study?.deadline}</BoldText>
              <span className="text-13 font-bold text-status-error">
                {getDiffDate(study?.deadline as string)
                  ? `(D-${getDiffDate(study?.deadline as string)})`
                  : '마감'}
              </span>
            </div>
          </div>
        </InfoTextContainer>
        <ul className="flex gap-x-2">
          {study?.categories.map((category) => (
            <CategoryBox key={category}>{category}</CategoryBox>
          ))}
        </ul>
        <TagContainer>
          <GrayText>태그</GrayText>
          <ul className="ml-1 flex gap-x-1.5">
            {study?.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        </TagContainer>
        <DivisionBar />
        <ContentTitle>스터디 소개</ContentTitle>
        <Content
          dangerouslySetInnerHTML={{
            __html: study?.post_content as TrustedHTML,
          }}
        />
      </div>
    </div>
  );
};

export default StudyDetailContent;

const CategoryBox = tw.li`
  flex
  h-fit
  w-fit
  cursor-pointer
  list-none
  items-center
  justify-center
  rounded-[7px]
  border-[1.5px]
  border-[#8266FF]
  bg-white
  px-4
  py-2
  text-[#8266FF]
`;

const ImageBox = tw.div`
  relative
  mt-2
  h-[254px]
  w-full
  rounded-lg
  border-[1px]
  border-black
`;

const InfoTextContainer = tw.div`
  mt-7
  flex
  items-center
  justify-between
  gap-x-12
`;

const DivisionBar = tw.span`
  bg-text-secondary
  mb-3
  mt-6
  h-[0.1px]
  w-full
  opacity-30
`;

const ContentTitle = tw.h2`
  text-text-secondary
  text-20
  font-bold
`;

const GrayText = tw.span`
  text-text-secondary
  font-bold
`;

const BoldText = tw.span`
  font-bold
`;

const Title = tw.h1`
  text-24
  font-bold
`;

const TagContainer = tw.div`
  mt-2
  flex
  items-center
  gap-x-1.5
`;

const Tag = tw.li`
  text-13
  h-fit
  w-fit
  cursor-pointer
  rounded-full
  border-[1px]
  border-[#C8B4FF]
  px-3
  py-1
`;

const Content = tw.span`
  mt-3
  whitespace-pre-line
`;
