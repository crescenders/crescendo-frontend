import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

export type StudyFormType = {
  head_image?: File | string;
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

const useStudyForm = (initialStudy?: StudyDetail) => {
  const inputRef = useRef<(HTMLInputElement | ReactQuill)[]>([]);
  const [studyForm, setStudyForm] = useState<StudyFormType>({
    head_image: '',
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

  const initStudyForm = () => {
    if (!initialStudy) return;
    for (const key in studyForm) {
      if (inputRef.current[key] && key !== 'head_image')
        inputRef.current[key].value = initialStudy[key];
      setStudyForm((prev) => {
        return {
          ...prev,
          [key]: initialStudy[key],
        };
      });
    }
  };

  const getInputRef = (el: HTMLInputElement | any) => {
    const key = el?.name || 'post_content';
    return (inputRef.current[key] = el);
  };

  const handleDeleteImage = () => {
    inputRef.current['head_image'].value = '';
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

  const getSubmitImage = (image: HTMLInputElement) => {
    if (image.files?.length) return image.files[0];
    if (initialStudy?.head_image === image.src) return initialStudy.head_image;
  };

  const handleSubmitInput = () => {
    const submitData = { ...studyForm };

    Object.keys(inputRef.current).map((key) => {
      if (key === 'head_image')
        submitData[key] = getSubmitImage(inputRef.current[key]);
      else submitData[key] = inputRef.current[key].value;
    });
    setStudyForm(submitData);
    return submitData;
  };

  useEffect(() => {
    initStudyForm();
  }, []);

  return {
    studyForm,
    initStudyForm,
    getInputRef,
    handleDeleteImage,
    handleDateChange,
    handleListChange,
    handleSubmitInput,
  };
};

export default useStudyForm;
