import Button from '@components/common/Button';
import Input from '@components/common/Input';
import PageLayout from '@components/common/PageLayout';
import DeleteModal from '@components/modal/DeleteModal';
import { useDeleteUser } from '@hooks/mutations/useDeleteUser';
import { usePutUser } from '@hooks/mutations/usePutUser';
import { useGetProfile } from '@hooks/queries/useGetProfile';
import useModal from '@hooks/useModal';
import { useToast } from '@providers/ToastProvider';
import { validateUsername } from '@utils/validate';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

const Edit = () => {
  const { mutate: putUser } = usePutUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { data: profile } = useGetProfile();
  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value || !usernameRef.current) return;
    setError(validateUsername(value));
  };

  const SubmitMyInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error || !usernameRef.current?.value) {
      usernameRef.current?.focus();
      showToast({
        type: 'fail',
        message: '올바른 형식으로 입력해주세요.',
      });
      return;
    }
    putUser(usernameRef.current.value as string);
    router.back();
  };

  const handleWithdrawal = () => {
    openModal(
      <DeleteModal
        handleClick={() => {
          deleteUser();
          closeModal();
          router.replace('/');
        }}
        title="회원 탈퇴"
        firstText="탈퇴한 계정은 복구할 수 없어요."
        secondText="그래도 탈퇴를 진행하시겠어요?"
      />,
    );
  };

  return (
    <PageLayout>
      <form
        onSubmit={SubmitMyInfo}
        className="relative flex h-screen flex-col items-center justify-center gap-y-4"
      >
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
          defaultValue={profile?.email}
        />
        <Button
          text="저장하기"
          isNormal={false}
          className="h-11 w-[270px] rounded-md text-[15px] font-bold"
        />
        <span
          className="cursor-pointer font-bold text-dark"
          onClick={handleWithdrawal}
        >
          회원 탈퇴하기
        </span>
      </form>
    </PageLayout>
  );
};

export default Edit;
