import { forwardRef } from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Partial<TextAreaProps>>(
  ({ id, label, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-y-2">
        {label && (
          <label htmlFor={id} className="text-20 font-bold">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          {...rest}
          className={`h-[150px] w-[550px] resize-none rounded-lg border-[1px] border-line-primary p-4 outline-none placeholder:text-sm placeholder:font-bold placeholder:text-text-primary focus:border-brand ${className}`}
        />
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
