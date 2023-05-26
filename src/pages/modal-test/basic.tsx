import tw from 'tailwind-styled-components';
import PageLayout from '@components/common/PageLayout';
import BasicModal from '@components/modal/BasicModal';

import { useState } from 'react';

const Basic = () => {
  const [nothingModalIsOpen, setNothingModalIsOpen] = useState(false);
  const [purpleTitleModalIsOpen, setPurpleTitleModalIsOpen] = useState(false);
  const [allModalIsOpen, setAllModalIsOpen] = useState(false);

  const modalObj = {
    nothingModal: () => setNothingModalIsOpen(false),
    purpleTitleModal: () => setPurpleTitleModalIsOpen(false),
    allModal: () => setAllModalIsOpen(false),
  };

  const handleClose = (modalName) => {
    return modalObj[modalName];
  };

  const handleClick = () => {
    alert('clicked');
  };

  return (
    <PageLayout>
      {/* Nothing Modal */}
      <button onClick={() => setNothingModalIsOpen(true)}>Nothing Modal</button>
      {nothingModalIsOpen && (
        <BasicModal
          isOpen={nothingModalIsOpen}
          close={handleClose('nothingModal')}
          title="참여 신청자"
        >
          <ModalWrapper>
            <div className="my-[30px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}

      {/* PurpleTitle Modal */}
      <button onClick={() => setPurpleTitleModalIsOpen(true)}>
        PurpleTitle Modal
      </button>
      {purpleTitleModalIsOpen && (
        <BasicModal
          isPurple
          isOpen={purpleTitleModalIsOpen}
          close={handleClose('purpleTitleModal')}
          title="참여 신청자"
        >
          <ModalWrapper>
            <div className="my-[30px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}

      {/* All Modal */}
      <button onClick={() => setAllModalIsOpen(true)}>All Modal</button>
      {allModalIsOpen && (
        <BasicModal
          isPurple
          isButton
          isOpen={allModalIsOpen}
          close={handleClose('allModal')}
          title="참여 신청자"
          onClick={handleClick}
        >
          <ModalWrapper>
            <div className=" mt-[20px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}
    </PageLayout>
  );
};

export default Basic;

const ModalWrapper = tw.div`
  mx-[58px]
  flex
  flex-col
  items-center
`;
