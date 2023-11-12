import useIsMounted from '@hooks/useIsMounted';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('useIsMounted를 테스트한다.', () => {
  it('마운트 되기 전 false를 반환해야 한다.', () => {
    const {
      result: { current },
      unmount,
    } = renderHook(() => useIsMounted());
    act(() => {
      waitFor(() => {
        unmount();
        expect(current).toBe(false);
      });
    });
    expect(current).toBe(true);
  });
});
