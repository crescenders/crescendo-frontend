import { getErrorMessage } from '@utils/getErrorMessage';

describe('utils/getErrorMessage를 테스트 한다.', () => {
  it(`403 에러를 응답할 경우 title: '스터디 그룹 멤버만 확인하실 수 있어요.', 'button: 이전 페이지로 이동' 이라는 객체가 포함되어 있어야 하고 content는 빈 문자열이여야 한다.`, () => {
    const ErrorObj = getErrorMessage(403);
    const compare = {
      title: '스터디 그룹 멤버만 확인하실 수 있어요.',
      content: '',
      button: '이전페이지로 이동',
    };
    expect(ErrorObj).toStrictEqual(compare);
  });

  it(`403 이 외의 에러일 경우 "잠시 후 시도해주세요" 라는 문자열을 포함한다.`, () => {
    const ErrorObj = getErrorMessage(500);
    const compare = {
      title: '잠시 후 다시 시도해주세요.',
      content: '요청사항을 처리하는데\n 실패했습니다.',
      button: '다시 시도하기',
    };
    expect(ErrorObj).toStrictEqual(compare);
  });
});
