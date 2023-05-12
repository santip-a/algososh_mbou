import {circle, button, input} from './constants';

describe("Тест страницы Строка", function () {
  before(function () {
    cy.visit("recursion");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(input)
      .should("have.value", "")
      .then(() => {
        cy.get(button).should("be.disabled");
      });
  });

  it("Тест разворачивания строки", () => {
    cy.visit("recursion");
    cy.get(input).type("12345");
    cy.contains("Развернуть").click();
    cy.get(circle).as('circles')

    cy.get('@circles').should(($lis) => {
      expect($lis).to.have.length(5)
      expect($lis.eq(0)).to.contain('1').to.have.css('border-color', 'rgb(210, 82, 225)')
      expect($lis.eq(1)).to.contain('2').to.have.css('border-color', 'rgb(0, 50, 255)')
      expect($lis.eq(2)).to.contain('3').to.have.css('border-color', 'rgb(0, 50, 255)')
      expect($lis.eq(3)).to.contain('4').to.have.css('border-color', 'rgb(0, 50, 255)')
      expect($lis.eq(4)).to.contain('5').to.have.css('border-color', 'rgb(210, 82, 225)')
    })

    cy.get('@circles').should(($lis) => {
      expect($lis).to.have.length(5)
      expect($lis.eq(0)).to.contain('5').to.have.css('border-color', 'rgb(127, 224, 81)')
      expect($lis.eq(1)).to.contain('2').to.have.css('border-color', 'rgb(210, 82, 225)')
      expect($lis.eq(2)).to.contain('3').to.have.css('border-color', 'rgb(0, 50, 255)')
      expect($lis.eq(3)).to.contain('4').to.have.css('border-color', 'rgb(210, 82, 225)')
      expect($lis.eq(4)).to.contain('1').to.have.css('border-color', 'rgb(127, 224, 81)')
    })

    cy.get('@circles').should(($lis) => {
      expect($lis).to.have.length(5)
      expect($lis.eq(0)).to.contain('5').to.have.css('border-color', 'rgb(127, 224, 81)')
      expect($lis.eq(1)).to.contain('4').to.have.css('border-color', 'rgb(127, 224, 81)')
      expect($lis.eq(2)).to.contain('3').to.have.css('border-color', 'rgb(127, 224, 81)')
      expect($lis.eq(3)).to.contain('2').to.have.css('border-color', 'rgb(127, 224, 81)')
      expect($lis.eq(4)).to.contain('1').to.have.css('border-color', 'rgb(127, 224, 81)')
    })
  })

});