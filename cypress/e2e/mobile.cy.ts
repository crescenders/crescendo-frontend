describe('Mobile Test', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (window) => {
        Object.defineProperty(window.navigator, 'userAgent', {
          value:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        });
      },
    });
  });

  it('모바일에서 접속 시 링크 복사하기 버튼이 보여야 한다.', () => {
    cy.get('button').contains('링크 복사하기');
    cy.contains('PC 환경으로 접속해주세요');
  });
});
