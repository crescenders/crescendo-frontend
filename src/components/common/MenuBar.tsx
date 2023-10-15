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
};

const focusStyle = {
  focus: 'z-[3] bg-[#9969BB] font-bold text-white w-[155px]',
  notFocus: 'text-[#AC85C8]',
};

const MenuBar = ({
  focusedPosition,
  leftText,
  centerText,
  rightText,
  leftPath,
  centerPath,
  rightPath,
}: MenuBarProps) => {
  return (
    <Wrapper>
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
            ? focusStyle['focus']
            : `${focusStyle['notFocus']} justify-end`
        } ml-[-40px]`}
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
  cursor-pointer
  items-center
  justify-center
  whitespace-nowrap
  rounded-full
  px-[35px]
  py-[14px]
  leading-[100%]
  ring-1
  ring-white
`;
