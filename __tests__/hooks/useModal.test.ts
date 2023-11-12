import useModal from '@hooks/useModal';
import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

describe('useIsModal을 테스트한다.', () => {
  it('반환하는 함수들은 undefined를 반환할 수 없다.', () => {
    const {
      result: {
        current: { openModal, closeModal },
      },
    } = renderHook(() => useModal(), {
      wrapper: RecoilRoot,
    });

    expect(openModal).toBeDefined();
    expect(closeModal).toBeDefined();
  });
});
