import ModalPortal from '@components/portal/ModalPortal';
import Button from '@components/common/Button';
import tw from 'tailwind-styled-components';
import useModal from '@hooks/useModal';
import { PropsWithChildren } from 'react';

type BasicModalProps = {
  isPurple?: boolean;
  isButton?: boolean;
  title: string;
  className?: React.ComponentProps<'div'>['className'];
  handleClick?: () => void;
};

type TitleProps = Pick<BasicModalProps, 'isPurple' | 'title'>;

const Title = ({ isPurple, title }: TitleProps) => {
  return (
    <span className={`${isPurple ? 'text-brand' : 'text-black'} font-bold`}>
      {title}
    </span>
  );
};

const BasicModal = ({
  isPurple,
  isButton,
  title,
  children,
  handleClick,
  ...rest
}: PropsWithChildren<BasicModalProps>) => {
  const { closeModal } = useModal();
  return (
    <ModalPortal>
      <ModalContentContainer {...rest}>
        <Title isPurple={isPurple} title={title} />
        <div>{children}</div>
        {isButton && (
          <div className="mb-[26px] mt-[68px] flex gap-[18px]">
            <Button isNormal text="취소" onClick={closeModal} />
            <Button
              className="h-[39px] w-[105px]"
              text="제출"
              onClick={handleClick}
            />
          </div>
        )}
      </ModalContentContainer>
    </ModalPortal>
  );
};

export default BasicModal;

const ModalContentContainer = tw.div`
  flex
  flex-col
  items-center
`;
