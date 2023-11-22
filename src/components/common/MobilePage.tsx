import Image from 'next/image';
import Button from '@components/common/Button';
import useToast from '@hooks/useToast';
import { useRouter } from 'next/router';

const MobilePage = () => {
  const { showToast } = useToast();
  const { pathname } = useRouter();

  const handleButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_DOMAIN + pathname,
      );
      showToast({
        type: 'success',
        message: '링크가 복사되었습니다.',
      });
    } catch (err) {
      showToast({
        type: 'fail',
        message: '링크 복사에 실패하였어요.',
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <Image src="/svg/mobile.svg" width={150} height={150} alt="mobile" />
      <h3 className="mb-[14px] mt-[31px] text-14 font-bold">
        PC 환경으로 접속해주세요
      </h3>
      <span className="mb-[30px] whitespace-pre-wrap text-center text-14 text-text-secondary">{`아직 모바일은 지원하지 않아요.\n PC 환경에서 이용해주세요!`}</span>
      <Button
        text="링크 복사하기"
        onClick={handleButtonClick}
        className="h-9 w-[134px]"
      />
    </main>
  );
};

export default MobilePage;
