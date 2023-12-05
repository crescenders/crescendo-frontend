import Header from '@components/common/Header';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  render(<Header />, {
    wrapper: RecoilRoot,
  });
});

describe('Header를 테스트한다.', () => {
  it('로고 이미지가 표시되어야 한다.', () => {
    const logoEl = screen.getByAltText('crescendo');

    expect(logoEl).toBeInTheDocument();
  });

  it('게스트 모드일 경우 로그인 / 회원가입 문구가 보여야 한다.', () => {
    const text = screen.getByText(/로그인/);

    expect(text).toBeInTheDocument();
  });
});
