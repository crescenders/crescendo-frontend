import { ERROR_MESSAGE } from '@constants/validation';
import { validateUsername } from '@utils/validate';

describe('validateUsername을 테스트한다.', () => {
  it('두 글자 미만 또는 10글자를 초과하면 검증에 실패한다.', () => {
    const usernameErrorMsg = ERROR_MESSAGE.username;
    expect(validateUsername('김')).toBe(usernameErrorMsg);
    expect(validateUsername('김김김김태태태태혀혀혀혀혀현')).toBe(
      usernameErrorMsg,
    );
  });

  it('특수문자 등 올바른 형식으로 입력하지 않을 경우 검증에 실패한다.', () => {
    const regexErrorMsg = ERROR_MESSAGE.regex;

    expect(validateUsername('김태현^^')).toBe(regexErrorMsg);
  });
});
