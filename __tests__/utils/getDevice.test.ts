import { getDevice } from '@utils/getDevice';

describe('getDevice 함수를 테스트한다.', () => {
  it('모바일 기기인 경우 mobile을 반환한다.', () => {
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('iPhone');

    const result = getDevice();
    expect(result).toBe('mobile');
  });

  it('데스크톱 기기인 경우 desktop을 반환한다.', () => {
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mac OS');

    const result = getDevice();
    expect(result).toBe('desktop');
  });
});
