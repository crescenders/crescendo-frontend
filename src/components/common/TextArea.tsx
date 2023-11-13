import { forwardRef } from 'react';
import tw from 'tailwind-styled-components';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Partial<TextAreaProps>>(
  ({ id, label, ...rest }, ref) => {
    return (
      <Container>
        {label && <Label htmlFor={id}>{label}</Label>}
        <BaseTextArea id={id} ref={ref} {...rest} />
      </Container>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

const Container = tw.div`
  flex
  flex-col
  gap-y-2
`;

const Label = tw.label`
  text-20
  font-bold
`;

const BaseTextArea = tw.textarea`
  border-line-primary
  placeholder:text-text-primary
  focus:border-brand
  h-[150px]
  w-[550px]
  resize-none
  rounded-lg
  border-[1px]
  p-4
  outline-none
  placeholder:font-bold
`;
