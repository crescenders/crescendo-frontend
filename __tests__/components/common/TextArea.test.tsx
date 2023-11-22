import TextArea from '@components/common/TextArea';
import { render, screen } from '@testing-library/react';

describe('TextArea 컴포넌트를 테스트한다.', () => {
  it('label props를 받으면 label이 표시되어야 한다.', () => {
    render(<TextArea id="test-textarea" label="제목" />);

    const labelElement = screen.getByLabelText('제목');

    expect(labelElement).toBeInTheDocument();
  });
});
