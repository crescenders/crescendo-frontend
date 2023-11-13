import Link from 'next/link';
import tw from 'tailwind-styled-components';

type MenuBarProps = {
  focusedPosition: 'left' | 'right' | 'center';
  leftText: string;
  centerText?: string;
  rightText: string;
  leftPath?: string;
  centerPath?: string;
  rightPath?: string;
  className?: React.ComponentProps<'div'>['className'];
};

const focusStyle = {
  focus: 'z-[3] bg-[#9969BB] font-bold text-white w-[155px] justify-center',
  notFocus: 'text-[#AC85C8] font-bold',
};

const MenuBar = ({
  focusedPosition,
  leftText,
  centerText,
  rightText,
  leftPath,
  centerPath,
  rightPath,
  ...rest
}: MenuBarProps) => {
  return (
    <Wrapper {...rest}>
      <Basic
        href={leftPath || '#'}
        className={`${
          focusedPosition === 'left'
            ? focusStyle['focus']
            : `${focusStyle['notFocus']} justify-start`
        }`}
      >
        {leftText}
      </Basic>
      {centerText && (
        <Basic
          href={centerPath || '#'}
          className={`${
            focusedPosition === 'center'
              ? focusStyle['focus']
              : `${focusStyle['notFocus']} ${
                  focusedPosition === 'left' ? 'justify-end' : 'justify-start'
                }`
          } z-[2] ml-[-40px]`}
        >
          {centerText}
        </Basic>
      )}
      <Basic
        href={rightPath || '#'}
        className={`${
          focusedPosition === 'right'
            ? centerText
              ? `${focusStyle['focus']} justify-center`
              : `${focusStyle['focus']} justify-center`
            : centerText
            ? `${focusStyle['notFocus']} justify-end`
            : `${focusStyle['notFocus']}`
        }
         ${centerText ? 'ml-[-40px]' : 'ml-[-30px]'}`}
      >
        {rightText}
      </Basic>
    </Wrapper>
  );
};

export default MenuBar;

const Wrapper = tw.div`
  bg-brand
  text-18
  relative
  flex
  overflow-hidden
  rounded-full
  border-white
  leading-[100%]
`;

const Basic = tw(Link)`
  bg-brand
  flex
  w-[165px]
  flex-1
  cursor-pointer
  whitespace-nowrap
  rounded-full
  px-[35px]
  py-[14px]
  leading-[100%]
  ring-1
  ring-white
`;
