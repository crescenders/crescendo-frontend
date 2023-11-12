import { render } from '@testing-library/react';
import LoginModal from '@components/modal/LoginModal';

describe('useScript를 테스트한다.', () => {
  it('LoginModal이 마운트되면 gsi <script> 태그가 존재해야 한다.', () => {
    const { unmount } = render(<LoginModal />);
    expect(document.head.innerHTML).toContain(
      '<script src="https://accounts.google.com/gsi/client"></script>',
    );
    unmount();
    expect(document.head.innerHTML).not.toContain(
      '<script src="https://accounts.google.com/gsi/client"></script>',
    );
  });
});
