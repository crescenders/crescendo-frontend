import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

describe('cookie를 테스트 한다.', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('setCookie는 쿠키를 생성해야 한다.', () => {
    setCookie('refreshToken', 'value');
    expect(document.cookie).toContain('refreshToken=value');
  });

  it('getCookie는 쿠키값을 반환해야 한다.', () => {
    // setCookie('refreshToken', 'value');
    const cookie = getCookie('refreshToken');
    expect(cookie).toBe('value');
  });

  it('쿠키가 존재하지 않을 경우 null을 반한해야 한다.', () => {
    const cookie = getCookie('foo');
    expect(cookie).toBeNull();
  });

  it('deleteCookie는 쿠키를 삭제해야 한다.', () => {
    expect(getCookie('refreshToken')).toBe('value');
    deleteCookie('refreshToken');
    expect(getCookie('refreshToken')).toBeNull();
  });
});
