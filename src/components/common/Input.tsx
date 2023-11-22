import { REQUIRED } from '@constants/index';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  variant: 'small' | 'middle' | 'large';
  required?: boolean;
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, required, variant, error, className, disabled, ...rest },
    ref,
  ) => {
    return (
      <div className={`flex flex-col ${label && 'gap-y-2'}`}>
        {label && (
          <div className="flex">
            {required && (
              <span className="mr-1 text-status-error">{REQUIRED}</span>
            )}
            <label
              htmlFor={id}
              className="text-14 font-bold text-text-secondary"
            >
              {label}
            </label>
          </div>
        )}
        <div className="relative flex items-center">
          <input
            id={id}
            ref={ref}
            className={`h-11 rounded-lg border-[1px] border-line-primary pl-[18px] outline-none placeholder:text-14 focus:border-brand ${
              (variant === 'small' && 'w-[270px]') ||
              (variant === 'middle' && 'w-[340px]') ||
              (variant === 'large' && 'w-[540px]')
            } ${disabled && 'bg-[#F0F0F0] text-text-primary'} ${className}`}
            disabled={disabled}
            {...rest}
          />
        </div>
        {error && (
          <span className="h-2 text-12 text-status-error">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
