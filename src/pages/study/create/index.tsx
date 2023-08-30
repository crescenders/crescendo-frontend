import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@components/common/Input';
import PageLayout from '@components/common/PageLayout';
import SelectDateBox from '@components/common/SelectDateBox';
import TagInput from '@components/common/TagInput';
import Button from '@components/common/Button';
import UploadImage from '@components/common/UploadImage';
import Slider from '@components/common/Slider';
import TextEditor from '@components/editor/TextEditor';
import { categories } from '@constants/categories';
import { REQUIRED } from '@constants/index';
import useStudyForm from '@hooks/useStudyForm';
import { useCreateStudy } from '@hooks/mutations/useCreateStudy';
import useToast from '@hooks/useToast';
import { validateInput } from '@utils/validate';

const CreateStudy = () => {
  const router = useRouter();
  const { mutate: createStudy } = useCreateStudy();
  const { showToast } = useToast();
  const {
    studyForm,
    getInputRef,
    handleDateChange,
    handleListChange,
    handleSubmitInput,
  } = useStudyForm();
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

  const handleCreateStudy = () => {
    const formData = new FormData();
    const { head_image, ...newStudy } = handleSubmitInput();
    const emptyList = errorMessage;

    if (head_image) formData.append('head_image', head_image[0]);

    for (const key in newStudy) {
      emptyList[key] = validateInput(newStudy[key]);
      if (!emptyList[key]) formData.append(key, newStudy[key]);
    }

    if (Object.values(emptyList).join('').length) {
      setErrorMessage({ ...emptyList });
      showToast({
        type: 'fail',
        message: '필수 항목을 모두 입력해주세요.',
      });
      return;
    }

    createStudy(formData);
  };

  return (
    <PageLayout>
      <div className="mb-[40px] mt-[90px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[34px]">
          <UploadImage ref={getInputRef} />
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
            error={errorMessage.post_title}
          />
          <Input
            required
            name="study_name"
            id="study"
            variant="large"
            label="스터디명을 입력해주세요."
            ref={getInputRef}
            error={errorMessage.study_name}
          />
          <TagInput setTagList={handleListChange} tagList={studyForm.tags} />
          <div className="flex flex-col gap-[18px] self-start">
            <div className="text-base font-bold">모집인원</div>
            <Slider max="10" name="member_limit" ref={getInputRef} />
          </div>
          <div className="flex w-[550px] justify-between">
            <SelectDateBox
              selectedDate={studyForm.deadline}
              setSelectedDate={(date) =>
                handleDateChange('deadline', date as TDate)
              }
              error={errorMessage.deadline}
            />
            <SelectDateBox
              selectRange
              minDate={studyForm.deadline}
              selectedDate={studyForm.start_date}
              setSelectedDate={(date) =>
                handleDateChange('start_date', date as TDate)
              }
              selectedEndDate={studyForm.end_date}
              setSelectedEndDate={(date) =>
                handleDateChange('end_date', date as TDate)
              }
              error={errorMessage.end_date}
            />
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
              id="text"
              className="h-[300px] w-full"
              placeholder="스터디에 대해 소개해주세요!"
            />
          </div>
          <div className="flex gap-3 self-end">
            <Button
              isNormal
              text="취소"
              className="h-[40px] w-[60px]"
              onClick={() => router.back()}
            />
            <Button
              text="글 등록"
              className="h-[40px] w-[80px]"
              onClick={handleCreateStudy}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateStudy;
