import ModalLayout from '@components/modal/ModalLayout';
import Button from '@components/common/Button';
import tw from 'tailwind-styled-components';

type BasicModalProps = Modal & {
  isPurple?: boolean;
  isButton?: boolean;
  title: string;
  className?: React.ComponentProps<'div'>['className'];
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
  isOpen,
  isPurple,
  handleClose,
  isButton,
  title,
  children,
  handleClick,
  ...rest
}: BasicModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} handleClose={handleClose}>
      <ModalContentContainer {...rest}>
        <Title isPurple={isPurple} title={title} />
        <div>{children}</div>
        {isButton && (
          <div className="mb-[26px] mt-[68px] flex gap-[18px]">
            <Button isNormal text="취소" onClick={handleClose} />
            <Button
              className="h-[39px] w-[105px]"
              text="제출"
              onClick={handleClick}
            />
          </div>
        )}
      </ModalContentContainer>
    </ModalLayout>
  );
};

export default BasicModal;

const ModalContentContainer = tw.div`
  flex
  flex-col
  items-center
`;
