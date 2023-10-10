import { Suspense } from 'react';
import MemberList from '@components/manage/MemberList';
import Loader from '@components/common/Loader';
import ModalPortal from '@components/portal/ModalPortal';

type MemberModalProps = {
  uuid: string;
  title: '참여 신청자' | '스터디원 관리';
};

const MemberModal = ({ uuid, title }: MemberModalProps) => {
  return (
    <ModalPortal>
      <div className="flex h-[378px] w-[414px] flex-col items-center justify-between gap-8 p-9">
        <span className="font-bold text-brand">{title}</span>
        <div className="relative flex h-[250px] w-[342px] flex-col items-center gap-6 overflow-y-scroll">
          <Suspense fallback={<Loader />}>
            <MemberList uuid={uuid} isApproved={title === '스터디원 관리'} />
          </Suspense>
        </div>
      </div>
    </ModalPortal>
  );
};

export default MemberModal;
