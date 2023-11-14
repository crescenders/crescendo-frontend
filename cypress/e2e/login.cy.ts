describe('LoginTest', () => {
  it('비로그인 상태로 로그인 필요 페이지 접근시 /login으로 이동', () => {
    cy.visit('/mypage/edit');
    cy.url().should('include', '/login');
  });

  it('비로그인 상태로 로그인 필요 페이지 접근시 /login으로 이동', () => {
    cy.visit('/create');
    cy.url().should('include', '/login');
  });
});
