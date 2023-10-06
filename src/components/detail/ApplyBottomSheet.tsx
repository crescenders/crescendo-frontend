import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import TextArea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { useApplyStudy } from '@hooks/mutations/useApplyStudy';
import useToast from '@hooks/useToast';

const ApplyBottomSheet = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const { mutate: applyStudy } = useApplyStudy();

  const handleApplyStudy = () => {
    const uuid = String(router.query.id);
    const message = String(ref.current?.value);

    if (!message.length) {
      showToast({
        type: 'fail',
        message: '내용을 입력해주세요.',
      });
      return;
    }
    applyStudy({ uuid, message });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Container onClick={() => setIsOpen(false)}>
          <BottomSheetBox
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            <div className="flex justify-center">
              <TextArea
                id="apply-textarea"
                label="신청서 작성"
                ref={ref}
                placeholder="신청과 함께 본인을 소개하는 문구를 작성해주세요!"
              />
            </div>
            <div className="mt-4 flex justify-end px-20">
              <Button
                text="제출하기"
                className="h-[32px] w-[74px] rounded-full"
                onClick={handleApplyStudy}
              />
            </div>
            <ApplyBtn
              className="absolute right-0 top-[-42px]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <BtnText>신청하기</BtnText>
              <Image
                src="/svg/arrow_up.svg"
                width={20}
                height={20}
                alt="신청하기"
                className={`${isOpen && 'rotate-[-180deg]'}`}
              />
            </ApplyBtn>
          </BottomSheetBox>
        </Container>
      ) : (
        <div className="flex justify-center">
          <div className="fixed bottom-0 w-full max-w-3xl">
            <ApplyBtn
              className="absolute bottom-0 right-0"
              onClick={() => setIsOpen(true)}
            >
              <BtnText>신청하기</BtnText>
              <Image
                src="/svg/arrow_up.svg"
                width={20}
                height={20}
                alt="신청하기"
                className={`${isOpen && 'rotate-[-180deg]'}`}
              />
            </ApplyBtn>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyBottomSheet;

const Container = tw.div`
  fixed
  bottom-0
  left-0
  right-0
  z-[999]
  flex
  h-screen
  w-screen
  items-end
  justify-center
  bg-[rgba(51,51,53,0.6)]
`;
const BottomSheetBox = tw.section`
  animate-slideUp
  relative
  bottom-0
  z-[999]
  mx-auto
  my-0
  flex
  w-full
  max-w-3xl
  flex-col
  rounded-t-md
  bg-white
  px-6
  py-6
`;

const ApplyBtn = tw.button`
  bg-brand
  z-[1000]
  flex
  h-[42px]
  w-[120px]
  items-center
  justify-center
  gap-x-1
  rounded-md
  hover:bg-[#a24ec8]
  hover:duration-500
  hover:ease-in-out
`;

const BtnText = tw.span`
  text-14
  select-none
  font-bold
  text-white
`;
