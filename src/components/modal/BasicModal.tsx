import Layout from './Layout';
import Button from '@components/common/Button';

type BasicModalProps = {
  isOpen: boolean;
  isPurple?: boolean;
  isButton?: boolean;
  close: () => void;
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
};

type TitleProps = {
  isPurple?: boolean;
  title: string;
};

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
  close,
  isButton,
  title,
  children,
  onClick,
}: BasicModalProps) => {
  return (
    <Layout isOpen={isOpen} close={close}>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
        <Title isPurple={isPurple} title={title} />
        <div>{children}</div>
        {isButton && (
          <div className="mb-[26px] mt-[68px] flex gap-[18px]">
            <Button isNormal text="취소" onClick={close} />
            <Button
              className="h-[39px] w-[105px]"
              text="제출"
              onClick={onClick}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BasicModal;
