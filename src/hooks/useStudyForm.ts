import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';

export type StudyFormType = {
  head_image: File | null;
  post_title: string;
  post_content: string;
  study_name: string;
  start_date: string;
  end_date: string;
  deadline: string;
  tags: string[];
  categories: string[];
  member_limit: number;
};

const useStudyForm = () => {
  const inputRef = useRef<(HTMLInputElement | ReactQuill)[]>([]);
  const [studyForm, setStudyForm] = useState<StudyFormType>({
    head_image: null,
    post_title: '',
    post_content: '',
    study_name: '',
    start_date: '',
    end_date: '',
    deadline: '',
    tags: [],
    categories: [],
    member_limit: 2,
  });

  const getInputRef = (el: HTMLInputElement | any) => {
    const key = el?.name || 'post_content';
    return (inputRef.current[key] = el);
  };

  const handleDateChange = (key: string, value: string) => {
    const isShouldResetRange =
      key === 'deadline' && new Date(value) >= new Date(studyForm.start_date);

    setStudyForm((prev) => {
      return {
        ...prev,
        ...(isShouldResetRange && {
          start_date: '',
          end_date: '',
        }),
        [key]: value,
      };
    });
  };

  const handleListChange = (key: string, value: string[]) => {
    setStudyForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmitInput = () => {
    const submitData = { ...studyForm };

    Object.keys(inputRef.current).map((key) => {
      if (key === 'head_image') submitData[key] = inputRef.current[key].files;
      else submitData[key] = inputRef.current[key].value;
    });
    setStudyForm(submitData);

    return submitData;
  };

  return {
    studyForm,
    getInputRef,
    handleDateChange,
    handleListChange,
    handleSubmitInput,
  };
};

export default useStudyForm;
