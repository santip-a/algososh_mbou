describe('Тест страницы Фибоначчи', function () {
  before(function () {
    cy.visit('fibonacci');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input')
      .should('have.value', '')
      .then(() => {
        cy.get('button').should('be.disabled')
      });
  });

  it('Числа генерируются правильно', function () {
    cy.visit('fibonacci');
    cy.get('input').type('5');
    cy.contains('Рассчитать').click();

    cy.get('[data-testid="circle"]').should(($lis) => {
      expect($lis).to.have.length(5)
      expect($lis.eq(0)).to.contain('1')
      expect($lis.eq(1)).to.contain('1')
      expect($lis.eq(2)).to.contain('2')
      expect($lis.eq(3)).to.contain('3')
      expect($lis.eq(4)).to.contain('5')
    })
  })

})