import { formatUTC } from '@utils/formatUTC';

describe('utils/formatUTC를 테스트한다.', () => {
  it('2023-11-11T18:51:11.362724+09:00는 2023-11-11이 되어야 한다.', () => {
    const format = formatUTC('2023-11-11T18:51:11.362724+09:00');

    expect(format).toBe('2023-11-11');
  });

  it('2023-08-24T18:51:11.362724+09:00는 2023-11-11이 되어야 한다.', () => {
    const format = formatUTC('2023-08-24T18:51:11.362724+09:00');

    expect(format).toBe('2023-08-24');
  });
});
