import Button from '@components/common/Button';
import Input from '@components/common/Input';
import PageLayout from '@components/common/PageLayout';
import { validateUsername } from '@utils/validate';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';

const Edit = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value || !usernameRef.current) return;
    setError(validateUsername(value));
  };

  const SubmitMyInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error || !usernameRef.current?.value) {
      usernameRef.current?.focus();
      alert('올바른 형식으로 입력해주세요.'); // TODO: 임의로 넣어봤는데 추후 토스트로 대체하면 좋을듯..?
    }
  };

  return (
    <PageLayout>
      <EditForm onSubmit={SubmitMyInfo}>
        <Input
          id="username-input"
          variant="small"
          label="닉네임"
          ref={usernameRef}
          maxLength={10}
          onChange={handleUserName}
          error={error}
        />
        <Input
          id="email-input"
          variant="small"
          label="이메일"
          type="email"
          disabled
          defaultValue="user@email.com"
        />
        <Button
          text="저장하기"
          isNormal={false}
          className="w-[270px] h-11 rounded-md font-bold text-[15px]"
        />
        <span className="font-bold cursor-pointer text-dark">
          회원 탈퇴하기
        </span>
      </EditForm>
    </PageLayout>
  );
};

export default Edit;

const EditForm = tw.form`
  relative
  flex
  h-screen
  flex-col
  items-center
  justify-center
  gap-y-4
`;
