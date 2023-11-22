import Input from '@components/common/Input';
import { ERROR_MESSAGE } from '@constants/validation';
import { render, screen } from '@testing-library/react';

describe('Input 컴포넌트를 테스트한다.', () => {
  it('label props를 받으면 label이 표시되어야 한다.', () => {
    render(<Input id="test-input" label="제목" variant="small" />);

    const labelElement = screen.getByLabelText('제목');

    expect(labelElement).toBeInTheDocument();
  });

  it('required이 true면 * 문구를 표시한다.', () => {
    render(<Input id="test-input" label="제목" variant="small" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('입력값이 검증에 실패할 때 error 문구를 표시한다.', () => {
    render(
      <Input
        id="test-input"
        label="제목"
        variant="small"
        required
        error={ERROR_MESSAGE.required}
      />,
    );

    expect(screen.getByText(ERROR_MESSAGE.required)).toBeInTheDocument();
  });
});
