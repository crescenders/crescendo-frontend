import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type ForwardedQuillComponent = ReactQuillProps & {
  forwardedRef: React.Ref<ReactQuill>;
};

const QuillComponent = React.lazy(() => import('react-quill'));

const QuillEditor = ({ forwardedRef, ...props }: ForwardedQuillComponent) => {
  return <QuillComponent ref={forwardedRef} {...props} />;
};

export default QuillEditor;
