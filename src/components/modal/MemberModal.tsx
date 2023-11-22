import MemberList from '@components/member/MemberList';
import Loader from '@components/common/Loader';
import ModalPortal from '@components/portal/ModalPortal';
import ApplicationList from '@components/member/ApplicationList';
import AsyncBoundary from '@components/async/AsyncBoundary';

type MemberModalProps = {
  title: '참여 신청자' | '스터디원 목록';
};

const MemberModal = ({ title }: MemberModalProps) => {
  return (
    <ModalPortal>
      <div className="flex h-[378px] w-[414px] flex-col items-center justify-between gap-8 p-9">
        <span className="font-bold text-brand">{title}</span>
        <div className="relative flex h-[250px] w-[342px] flex-col items-center gap-6 overflow-y-scroll">
          <AsyncBoundary suspenseFallback={<Loader />}>
            {title === '스터디원 목록' ? <MemberList /> : <ApplicationList />}
          </AsyncBoundary>
        </div>
      </div>
    </ModalPortal>
  );
};

export default MemberModal;
