import Image from 'next/image';
import tw from 'tailwind-styled-components';
import ModalPortal from '@components/portal/ModalPortal';
import Button from '@components/common/Button';
import useModal from '@hooks/useModal';

type SubmitModalProps = {
  handleClick: () => void;
};

const SubmitModal = ({ handleClick }: SubmitModalProps) => {
  const { closeModal } = useModal();
  return (
    <ModalPortal>
      <ModalContentContainer>
        <span className="font-bold mt-4">과제 제출</span>
        <InputContainer>
          <Image
            src="/svg/link.svg"
            width={18}
            height={18}
            alt="링크"
            className="relative left-9"
          />
          <InputBox type="url" required placeholder="링크를 입력해주세요." />
        </InputContainer>
        <div className="mb-[26px] mt-[68px] flex gap-[18px]">
          <Button isNormal text="취소" onClick={closeModal} />
          <Button
            className="h-[39px] w-[105px]"
            text="제출"
            onClick={handleClick}
          />
        </div>
      </ModalContentContainer>
    </ModalPortal>
  );
};

export default SubmitModal;

const ModalContentContainer = tw.div`
  px
  flex
  flex-col
  items-center
  px-[38px]
  pt-[26px]
`;

const InputContainer = tw.div`
  mb-2
  mt-[61px]
  flex
  items-center
`;

const InputBox = tw.input`
  text-14
  h-12
  w-[340px]
  rounded-lg
  border-[1px]
  border-[#E1E6F9]
  bg-white
  px-12
`;
