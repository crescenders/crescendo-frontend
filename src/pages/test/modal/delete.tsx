import PageLayout from '@components/common/PageLayout';
import DeleteModal from '@components/modal/DeleteModal';

import { useState } from 'react';

const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <PageLayout>
      <button onClick={() => setIsOpen(true)}>DeleteBtn Modal</button>
      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          handleClose={closeModal}
          handleClick={() => alert('삭제')}
          title="과제 삭제"
          firstText="삭제한 결과는 복구할 수 없어요."
          secondText="삭제 진행하시겠어요?"
        />
      )}
    </PageLayout>
  );
};

export default Basic;
