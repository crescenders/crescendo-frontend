import Image from 'next/image';
import { Dispatch, SetStateAction, KeyboardEvent, useState } from 'react';
import tw from 'tailwind-styled-components';
import Input from '@components/common/Input';

type TagInputProps = {
  error: string;
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
};

const TagInput = ({ error, tagList, setTagList }: TagInputProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value &&
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false
    ) {
      const newTag = e.currentTarget.value;
      e.currentTarget.value = '';

      if (tagList.includes(newTag)) {
        setErrorMessage('중복된 태그입니다.');
        return;
      }

      setErrorMessage('');
      setTagList((prev) => [...prev, newTag]);
    }
  };

  const handleClickRemoveButton = (targetIndex: number) => {
    setTagList((prev) => prev.filter((_, index) => index !== targetIndex));
  };

  return (
    <Container $isError={!!errorMessage}>
      <Input
        id="tags"
        variant="large"
        label=""
        placeholder="태그 입력 후 엔터를 눌러주세요."
        onKeyDown={handleKeyDown}
        error={tagList.length ? errorMessage : error}
      />
      <TagContainer>
        {tagList &&
          tagList.map((tag, index) => (
            <TagItem key={index}>
              <TagLabel>{tag}</TagLabel>
              <Image
                src="/svg/clear_button_nobackground.svg"
                width={12}
                height={12}
                alt="삭제"
                className="cursor-pointer"
                onClick={() => handleClickRemoveButton(index)}
              />
            </TagItem>
          ))}
      </TagContainer>
    </Container>
  );
};

export default TagInput;

const Container = tw.div<{ $isError: boolean }>`
  ${({ $isError }) => $isError && 'gap-y-4'}
  flex
  w-[550px]
  flex-col
`;

const TagContainer = tw.div`
  flex
  w-full
  select-none
  flex-wrap
  gap-2
`;

const TagItem = tw.div`
  flex
  gap-1
  rounded-full
  border
  border-solid
  border-purple-300
  py-[5px]
  pl-[10px]
  pr-[7px]
`;

const TagLabel = tw.p`
  pt-[2px]
  text-[12px]
`;
