import Button from '@components/common/Button';
import { render, screen } from '@testing-library/react';

const onClickMock = jest.fn();

beforeEach(() => {
  render(<Button text="스터디 개설하기" onClick={onClickMock} />);
});

describe('Button을 테스트한다.', () => {
  it('버튼에 텍스트가 잘 보이는지 테스트', () => {
    const btnEl = screen.getByText('스터디 개설하기');

    expect(btnEl).toBeInTheDocument();
  });

  it('별도의 props를 지정해주지 않을 경우 배경색은 보라색이다.', () => {
    // render(<Button text="스터디 개설하기" />);

    const btnEl = screen.getByRole('button', {
      name: '스터디 개설하기',
    });

    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toHaveClass('bg-brand');
  });

  it('props가 isNormal이고 삭제라는 텍스트일 때 배경은 빨간색이다.', () => {
    jest.clearAllMocks();
    render(<Button isNormal text="삭제" />);

    const btnEl = screen.getByRole('button', {
      name: '삭제',
    });

    expect(btnEl).toBeInTheDocument();
    expect(btnEl).toHaveClass('bg-warning');
  });
});
