import { getProgress } from '@utils/getProgress';

describe('getProgress를 테스트한다.', () => {
  it('오늘 날짜가 시작일 이전이면 진행도는 0이여야 한다.', () => {
    const progress = getProgress('2024-05-23', '2024-06-27');

    expect(progress).toBe(0);
  });

  it('오늘 날짜가 마감일 이후면 진행도는 100이여야 한다.', () => {
    const progress = getProgress('2022-05-23', '2022-06-27');

    expect(progress).toBe(100);
  });

  it('오늘 날짜가 시작일과 마감일 사이면 진행도는 0 초과 100 이하여야 한다.', () => {
    const progress = getProgress('2023-05-23', '2024-11-12');

    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});
