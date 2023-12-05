import { dateSelector, dateState } from '@recoil/date';
import { startOfDay } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export type StudyFormType = {
  head_image?: File | string;
  post_title: string;
  post_content: string;
  study_name: string;
  tags: string[];
  categories: string[];
  member_limit: number;
};

const useStudyForm = (initialStudy?: StudyDetail) => {
  const inputRef = useRef<(HTMLInputElement | ReactQuill)[]>([]);
  const setSelectedDate = useSetRecoilState(dateState);
  const resetSelectedDate = useResetRecoilState(dateState);
  const selectedDate = useRecoilValue(dateSelector);
  const [studyForm, setStudyForm] = useState<StudyFormType>({
    head_image: '',
    post_title: '',
    post_content: '',
    study_name: '',
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
    setSelectedDate({
      deadline: startOfDay(new Date(initialStudy.deadline)),
      start_date: startOfDay(new Date(initialStudy.start_date)),
      end_date: startOfDay(new Date(initialStudy.end_date)),
    });
  };

  const getInputRef = (el: HTMLInputElement | any) => {
    const key = el?.name || 'post_content';
    return (inputRef.current[key] = el);
  };

  const handleDeleteImage = () => {
    inputRef.current['head_image'].value = '';
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
    if (initialStudy?.head_image !== image.src) return new File([], '');
  };

  const handleSubmitInput = () => {
    const submitData = { ...studyForm, ...selectedDate };

    Object.keys(inputRef.current).map((key) => {
      if (key === 'head_image')
        submitData[key] = getSubmitImage(inputRef.current[key]);
      else submitData[key] = inputRef.current[key].value;
    });
    setStudyForm(submitData);
    return submitData;
  };

  useEffect(() => {
    resetSelectedDate();
    initStudyForm();
  }, []);

  return {
    studyForm,
    getInputRef,
    handleDeleteImage,
    handleListChange,
    handleSubmitInput,
  };
};

export default useStudyForm;