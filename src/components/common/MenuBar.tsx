import Link from 'next/link';
import tw from 'tailwind-styled-components';

type MenuBar = {
  focusedPosition: 'left' | 'right';
  leftText: string;
  rightText: string;
  href: string;
};

const focusStyle = {
  focus:
    'z-[2] border border-solid border-white bg-[#9969BB] font-bold text-white px-[26px]',
  notFocus: 'text-[#AC85C8] px-[23px]',
};

const MenuBar = ({ focusedPosition, leftText, rightText, href }: MenuBar) => {
  return (
    <Wrapper>
      <Basic
        href={focusedPosition === 'left' ? '#' : href}
        className={`${
          focusedPosition === 'left'
            ? focusStyle['focus']
            : focusStyle['notFocus']
        }`}
      >
        {leftText}
      </Basic>
      <Basic
        href={focusedPosition === 'left' ? href : '#'}
        className={`${
          focusedPosition === 'left'
            ? focusStyle['notFocus']
            : focusStyle['focus']
        } ml-[-14px]`}
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
  w-[296px]
  rounded-[50px]
  leading-[100%]
`;

const Basic = tw(Link)`
  bg-brand
  flex
  w-[155px]
  cursor-pointer
  items-center
  justify-center
  rounded-[50px]
  py-[14px]
`;
