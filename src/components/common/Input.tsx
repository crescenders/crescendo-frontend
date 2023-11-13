import { REQUIRED } from '@constants/index';
import Image from 'next/image';
import { InputHTMLAttributes, forwardRef } from 'react';
import tw from 'tailwind-styled-components';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  variant: 'small' | 'middle' | 'large';
  required?: boolean;
  label?: string;
  error?: string;
};

type StyledInputProps = {
  $variant: string;
  disabled: boolean;
  $label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, required, variant, error, ...rest }, ref) => {
    return (
      <Container $label={label}>
        {label && (
          <LabelContainer>
            {required && (
              <span className="mr-1 text-status-error">{REQUIRED}</span>
            )}
            <Label htmlFor={id}>{label}</Label>
          </LabelContainer>
        )}
        <div className="relative flex items-center">
          <InputBox id={id} ref={ref} $variant={variant} {...rest} />
        </div>
        {error && (
          <span className="h-2 text-12 text-status-error">{error}</span>
        )}
      </Container>
    );
  },
);

Input.displayName = 'Input';

export default Input;

const Container = tw.div<Partial<StyledInputProps>>`
  ${({ $label }) => $label && 'gap-y-2'}
  flex
  flex-col
`;

const LabelContainer = tw.div`
  flex
`;

const Label = tw.label`
  text-14
  text-text-secondary
  font-bold
`;

const InputBox = tw.input<Partial<StyledInputProps>>`
  ${({ $variant }) =>
    ($variant === 'small' && 'w-[270px]') ||
    ($variant === 'middle' && 'w-[340px]') ||
    ($variant === 'large' && 'w-[550px]')}
  ${({ disabled }) => disabled && 'text-text-primary bg-[#F0F0F0]'}
  border-line-primary
  focus:border-brand
  placeholder:text-14
  h-11
  rounded-lg
  border-[1px]
  pl-[18px]
  outline-none
`;
