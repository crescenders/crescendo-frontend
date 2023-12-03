import Link from 'next/link';

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
  focus: 'z-[3] bg-[#9969BB] font-bold text-white w-[155px] justify-center',
  notFocus: 'text-[#AC85C8] font-bold bg-brand',
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
    <div className="mb-9 mt-[105px] flex w-full items-center justify-center">
      <div className="relative flex overflow-hidden rounded-full border-white bg-brand text-base leading-[100%] sm:text-18">
        <Link
          href={leftPath || '#'}
          className={`${
            focusedPosition === 'left'
              ? focusStyle['focus']
              : `${focusStyle['notFocus']} justify-start`
          } flex w-[165px] flex-1 cursor-pointer whitespace-nowrap rounded-full px-[35px] py-[14px] leading-[100%] ring-1 ring-white`}
        >
          {leftText}
        </Link>
        {centerText && (
          <Link
            href={centerPath || '#'}
            className={`${
              focusedPosition === 'center'
                ? focusStyle['focus']
                : `${focusStyle['notFocus']} ${
                    focusedPosition === 'left' ? 'justify-end' : 'justify-start'
                  }`
            } z-[2] ml-[-40px] flex w-[165px] flex-1 cursor-pointer whitespace-nowrap rounded-full px-[35px] py-[14px] leading-[100%] ring-1 ring-white`}
          >
            {centerText}
          </Link>
        )}
        <Link
          href={rightPath || '#'}
          className={`${
            focusedPosition === 'right'
              ? centerText
                ? `${focusStyle['focus']}`
                : `${focusStyle['focus']}`
              : centerText
              ? `${focusStyle['notFocus']} justify-end`
              : `${focusStyle['notFocus']}`
          }
         ${
           centerText ? 'ml-[-40px]' : 'ml-[-30px]'
         } flex w-[165px] flex-1 cursor-pointer whitespace-nowrap rounded-full  px-[35px] py-[14px] leading-[100%] ring-1 ring-white`}
        >
          {rightText}
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;
