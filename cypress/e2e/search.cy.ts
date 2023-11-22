describe('Search Test', () => {
  it('검색 페이지에서 최초 렌더링시 최신순 필터가 포함되어 있어야 한다.', () => {
    cy.visit('/search');
    cy.contains('최신순');
  });

  it('빈 값을 입력하면 필터링이 모두 해제되어야 하고 카테고리는 All이 선택되어야 한다.', () => {
    cy.visit('/search');
    cy.get('li').contains('All').should('have.class', 'border-[#8266FF]');
  });
});
