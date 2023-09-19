import { forwardRef, useState } from 'react';
import tw from 'tailwind-styled-components';

const Slider = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ defaultValue = 2, ...rest }, ref) => {
  const [memberLimit, setMemberLimit] = useState<string>('');

  return (
    <div className="relative h-[50px] w-[315px]">
      <div className="absolute left-[7px] top-2 h-2 w-full rounded-full border border-text-primary bg-line-primary" />
      <div
        style={{ width: `calc(100%/9*${+(memberLimit || defaultValue) - 1})` }}
        className="absolute left-[7px] top-2 h-2 rounded-full bg-brand after:block after:h-2 after:w-2 after:rounded-full after:bg-white after:ring-[7px] after:ring-brand"
      />
      <RangeInput
        ref={ref}
        type="range"
        min="2"
        step="1"
        defaultValue={defaultValue}
        onInput={(e) => setMemberLimit(e.currentTarget.value)}
        {...rest}
      />
      <ul className="absolute left-[10px] top-7 flex w-[310px] justify-between">
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            key={index}
            className={`${
              !index || index + 1 === +(memberLimit || defaultValue)
                ? 'visible'
                : 'invisible'
            } flex w-0 justify-center text-text-primary`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;

const RangeInput = tw.input`
  [&::-webkit-slider-thumb]:ring-brand
  absolute
  left-[calc(10%+7px)]
  top-2
  w-[90%]
  cursor-pointer
  appearance-none
  bg-transparent
  focus:outline-none
  [&::-webkit-slider-thumb]:h-2
  [&::-webkit-slider-thumb]:w-2
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:ring-[7px]
`;
