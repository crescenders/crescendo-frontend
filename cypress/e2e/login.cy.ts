describe('Login Test', () => {
  it('비로그인 상태로 로그인 필요 페이지 접근시 /login으로 이동', () => {
    cy.visit('/mypage/edit');
    cy.url().should('include', '/login');
  });

  it('비로그인 상태로 로그인 필요 페이지 접근시 /login으로 이동', () => {
    cy.visit('/create');
    cy.url().should('include', '/login');
  });

  it('로그인 상태로 로그인 페이지에 접근할 경우 토큰은 삭제된다.', () => {
    cy.setCookie('refreshToken', 'refresh');
    cy.visit('/login');
    cy.wait(1000);
    cy.getCookie('refreshToken').should('be.null');
  });
});
