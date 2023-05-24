import PageLayout from '@components/common/PageLayout';
import LoginModal from '@components/modal/LoginModal';
import { useState } from 'react';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <PageLayout>
      <button onClick={() => setIsOpen(true)}>Login Modal</button>
      {isOpen && <LoginModal isOpen={isOpen} close={closeModal} />}
    </PageLayout>
  );
};

export default Login;
