import Image from 'next/image';
import { Dispatch, SetStateAction, KeyboardEvent } from 'react';
import tw from 'tailwind-styled-components';

type TagInputProps = {
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
};

const TagInput = ({ tagList, setTagList }: TagInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && e.key === 'Enter') {
      const newTag = e.currentTarget.value;
      e.currentTarget.value = '';

      if (tagList.includes(newTag)) {
        alert('중복된 태그입니다.');
        return;
      }

      setTagList((prev) => [...prev, newTag]);
    }
  };

  const handleClickRemoveButton = (targetIndex: number) => {
    setTagList((prev) => prev.filter((_tag, index) => index !== targetIndex));
  };

  return (
    <Container>
      <Input
        onKeyDown={handleKeyDown}
        placeholder="태그 입력 후 엔터를 눌러주세요."
      />
      <TagContainer>
        {tagList &&
          tagList.map((tag, index) => (
            <TagItem key={index}>
              <TagLabel>{tag}</TagLabel>
              <Image
                src={'/svg/clear_button_nobackground.svg'}
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

const Container = tw.div`
  flex
  w-[550px]
  flex-col
  gap-y-3
`;

const Input = tw.input`
  border-line-primary
  focus:border-brand
  placeholder:text-14
  h-11
  w-full
  rounded-lg
  border-[1px]
  pl-[18px]
  outline-none
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
