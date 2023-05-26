import Layout from './Layout';
import Button from '@components/common/Button';

type BasicModalProps = Modal & {
  isPurple?: boolean;
  isButton?: boolean;
  title: string;
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
}: BasicModalProps) => {
  return (
    <Layout isOpen={isOpen} handleClose={handleClose}>
      <div className="mx-[68px] mt-[26px] flex flex-col items-center">
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
      </div>
    </Layout>
  );
};

export default BasicModal;
