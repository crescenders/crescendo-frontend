import { REQUIRED } from '@constants/index';
import Image from 'next/image';
import { InputHTMLAttributes, forwardRef } from 'react';
import tw from 'tailwind-styled-components';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  variant: 'small' | 'middle' | 'large';
  required?: boolean;
  label: string;
  link?: boolean;
  error?: string;
};

type StyledInputProps = {
  $variant: string;
  disabled?: boolean;
  $link?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, required, variant, link, error, ...rest }, ref) => {
    return (
      <Container>
        <LabelContainer>
          {required && (
            <span className="text-status-error mr-1">{REQUIRED}</span>
          )}
          <Label htmlFor={id}>{label}</Label>
        </LabelContainer>
        <div className="flex relative items-center">
          {link && (
            <Image
              src="/svg/link.svg"
              width={18}
              height={18}
              alt="link"
              className="absolute left-4"
            />
          )}
          <InputBox ref={ref} $variant={variant} $link={link} {...rest} />
        </div>
        <span className="text-status-error text-12 h-2">{error}</span>
      </Container>
    );
  },
);

Input.displayName = 'Input';

export default Input;

const Container = tw.div`
  flex
  flex-col
  gap-y-2
`;

const LabelContainer = tw.div`
  flex
`;

const Label = tw.label`
  text-14
  text-text-secondary
  font-bold
`;

const InputBox = tw.input<StyledInputProps>`
  ${({ $variant }) =>
    ($variant === 'small' && 'w-[270px]') ||
    ($variant === 'middle' && 'w-[340px]') ||
    ($variant === 'large' && 'w-[550px]')}
  ${({ disabled }) => disabled && 'text-text-primary bg-[#F0F0F0]'}
  ${({ $link }) => ($link ? 'px-11' : 'pl-[18px]')}
  border-line-primary
  focus:border-brand
  placeholder:text-14
  h-11
  rounded-lg
  border-[1px]
  outline-none
`;
