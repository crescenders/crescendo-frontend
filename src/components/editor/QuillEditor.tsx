import Loader from '@components/common/Loader';
import dynamic from 'next/dynamic';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type ForwardedQuillComponent = ReactQuillProps & {
  forwardedRef: React.Ref<ReactQuill>;
};

const QuillEditor = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    ),
    ssr: false,
  },
);

export default QuillEditor;
