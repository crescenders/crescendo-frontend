import { useState } from 'react';
import Input from '@components/common/Input';
import SelectDateBox from '@components/common/SelectDateBox';
import TagInput from '@components/common/TagInput';
import UploadImage from '@components/common/UploadImage';
import Slider from '@components/common/Slider';
import TextEditor from '@components/editor/TextEditor';
import { REQUIRED } from '@constants/index';
import { categories } from '@constants/categories';
import { ERROR_MESSAGE } from '@constants/validation';
import useStudyForm from '@hooks/useStudyForm';
import { validateStudy } from '@utils/validate';
import { useToast } from '@providers/ToastProvider';

type StudyFormProps = {
  onSubmit: (formData: FormData) => void;
  study?: StudyDetail;
};

const StudyForm = ({ study, onSubmit }: StudyFormProps) => {
  const { showToast } = useToast();
  const {
    studyForm,
    getInputRef,
    handleDeleteImage,
    handleListChange,
    handleSubmitInput,
  } = useStudyForm(study);
  const [errorMessage, setErrorMessage] = useState({
    post_title: '',
    post_content: '',
    study_name: '',
    start_date: '',
    end_date: '',
    deadline: '',
    categories: '',
  });

  const handleCategoryList = (clickedCategory: string) => {
    if (studyForm.categories.includes(clickedCategory)) {
      handleListChange(
        'categories',
        studyForm.categories.filter((category) => category !== clickedCategory),
      );
      return;
    }
    handleListChange('categories', [...studyForm.categories, clickedCategory]);
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const handleSubmitStudy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const { head_image, ...newStudy } = handleSubmitInput();
    const errorList = errorMessage;

    if (head_image) formData.append('head_image', head_image);

    for (const key in newStudy) {
      if (key !== 'tags') errorList[key] = validateStudy(newStudy[key]);
      if (Array.isArray(newStudy[key])) {
        newStudy[key].map((item: string) => {
          formData.append(key, item);
        });
      } else formData.append(key, newStudy[key]);
    }
    if (Object.values(errorList).join('').length) {
      setErrorMessage({ ...errorList });
      showToast({
        type: 'fail',
        message: errorList.post_content.includes('script')
          ? ERROR_MESSAGE.postContent
          : '필수 항목을 모두 입력해주세요.',
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      id="study"
      onSubmit={handleSubmitStudy}
      className="flex flex-col items-center justify-center gap-[34px]"
    >
      <UploadImage
        ref={getInputRef}
        deleteImage={handleDeleteImage}
        defaultUrl={study?.head_image}
      />
      <div className="flex w-[550px] flex-col items-center justify-center gap-y-2">
        <p className="w-full text-left text-16 font-bold text-text-secondary">
          <span className="mr-1 text-status-error">{REQUIRED}</span>
          해당하는 카테고리를 모두 선택해주세요.
        </p>
        <ul className="flex flex-wrap gap-3">
          {categories.map(({ id, name }) => (
            <li
              key={id}
              onClick={() => handleCategoryList(name)}
              className={`${
                studyForm.categories.includes(name)
                  ? 'border-[#8266FF] text-[#8266FF]'
                  : 'border-[#EAEAEB] text-black'
              } cursor-pointer select-none rounded-lg border  px-4 py-2 text-[14px]`}
            >
              {name}
            </li>
          ))}
        </ul>
        <span className="h-2 w-full text-12 text-status-error">
          {errorMessage.categories}
        </span>
      </div>
      <Input
        required
        name="post_title"
        id="title"
        variant="large"
        label="제목을 입력해주세요."
        ref={getInputRef}
        onKeyDown={handleEnterKeyDown}
        error={errorMessage.post_title}
      />
      <Input
        required
        name="study_name"
        id="study"
        variant="large"
        label="스터디명을 입력해주세요."
        ref={getInputRef}
        onKeyDown={handleEnterKeyDown}
        error={errorMessage.study_name}
      />
      <TagInput setTagList={handleListChange} tagList={studyForm.tags} />
      <div className="flex flex-col gap-[18px] self-start">
        <div className="text-base font-bold">모집인원</div>
        <Slider
          max="10"
          name="member_limit"
          ref={getInputRef}
          defaultValue={studyForm.member_limit}
        />
      </div>
      <div className="flex w-[550px] justify-between">
        <SelectDateBox error={errorMessage.deadline} />
        <SelectDateBox isRange error={errorMessage.end_date} />
      </div>
      <div className="flex h-[380px] w-full flex-col items-center justify-start gap-[18px]">
        <div className="flex w-full flex-col gap-y-1">
          <div className="text-base font-bold">스터디 상세 소개</div>
          <span className="h-2 w-full text-12 text-status-error">
            {errorMessage.post_content}
          </span>
        </div>
        <TextEditor
          ref={getInputRef}
          defaultValue={studyForm.post_content}
          id="text"
          className="h-[300px] w-[550px]"
          placeholder="스터디에 대해 소개해주세요!"
        />
      </div>
    </form>
  );
};

export default StudyForm;
