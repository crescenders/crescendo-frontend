import DropBox from '@components/common/DropBox';
import { render, fireEvent } from '@testing-library/react';

describe('DropBox를 테스트한다.', () => {
  const topEventMock = jest.fn();
  const bottomEventMock = jest.fn();
  const { getByAltText, getByText } = render(
    <DropBox topEvent={topEventMock} bottomEvent={bottomEventMock} />,
  );

  // 사용자가 ... 이미지를 클릭한다.
  const moreButton = getByAltText('more');
  fireEvent.click(moreButton);

  expect(topEventMock).not.toHaveBeenCalled();
  expect(bottomEventMock).not.toHaveBeenCalled();
  expect(getByText('수정')).toBeInTheDocument();
  expect(getByText('삭제')).toBeInTheDocument();

  // 사용자가 수정 텍스트를 클릭한다.
  const editOption = getByText('수정');
  fireEvent.click(editOption);

  expect(topEventMock).toHaveBeenCalled();
  expect(bottomEventMock).not.toHaveBeenCalled();
});
