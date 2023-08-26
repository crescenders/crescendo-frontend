import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

const useStudyForm = () => {
  const inputRef = useRef<(HTMLInputElement | ReactQuill)[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [study, setStudy] = useState({
    head_image: null,
    post_title: '',
    post_content: '',
    study_name: '',
    start_date: null,
    end_date: null,
    deadline: null,
    tags: tagList,
    categories: categoryList,
    member_limit: 1,
  });

  const getInputRef = (el: HTMLInputElement | any) => {
    const key = el?.name || 'post_content';
    return (inputRef.current[key] = el);
  };

  const handleDateChange = (key: string, value: Date | null) => {
    setStudy((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmitInput = () => {
    const submitData = study;

    Object.keys(inputRef.current).map((key) => {
      if (key === 'head_image') submitData[key] = inputRef.current[key].files;
      else submitData[key] = inputRef.current[key].value;
    });
    setStudy(submitData);

    return submitData;
  };

  useEffect(() => {
    setStudy((prev) => {
      return {
        ...prev,
        tags: tagList,
      };
    });
  }, [tagList]);

  useEffect(() => {
    setStudy((prev) => {
      return {
        ...prev,
        categories: categoryList,
      };
    });
  }, [categoryList]);

  return {
    study,
    getInputRef,
    setCategoryList,
    setTagList,
    handleDateChange,
    handleSubmitInput,
  };
};

export default useStudyForm;
