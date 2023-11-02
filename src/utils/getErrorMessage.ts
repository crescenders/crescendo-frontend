const getErrorMessage = (status: number) => {
  switch (status) {
    case 403:
      return {
        title: '스터디 그룹 멤버만 확인하실 수 있어요.',
        content: '',
        button: '이전페이지로 이동',
      };
    default:
      return {
        title: '잠시 후 다시 시도해주세요.',
        content: '요청사항을 처리하는데\n 실패했습니다.',
        button: '다시 시도하기',
      };
  }
};

export { getErrorMessage };
