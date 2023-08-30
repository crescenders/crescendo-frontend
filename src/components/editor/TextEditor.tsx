import React, { forwardRef, useMemo } from 'react';
import QuillEditor from '@components/editor/QuillEditor';
import ReactQuill, { ReactQuillProps } from 'react-quill';

const TextEditor = forwardRef<ReactQuill, ReactQuillProps>(
  ({ ...props }, ref) => {
    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',
              'code-block',
            ],
            [{ color: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ],
          handlers: {},
        },
        clipboard: {
          matchVisual: false,
        },
      }),
      [],
    );

    const formats = [
      'header',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      'color',
      'list',
      'bullet',
      'align',
    ];

    return (
      <QuillEditor
        forwardedRef={ref}
        modules={modules}
        formats={formats}
        theme="snow"
        {...props}
      />
    );
  },
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
