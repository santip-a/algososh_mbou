import {circle, button, input, buttonDelete, buttonClear} from './constants';

describe("Тест страницы Стек", function () {
  before(() => {
    cy.visit("stack");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(input)
      .should("have.value", "")
      .then(() => {
        cy.get(button).should("be.disabled");
      });
  });

  it('Добавления элемента в стек', () => {
    cy.visit("stack");
    for (let i = 0; i < 5; i++) {
      cy.get(input).type(i).should('have.value', i)
      cy.get(button).click()

      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(210, 82, 225)')
        .parent()
        .should("contain", "top")
      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
  })


  it("Правильное удаление элемента", () => {
    cy.visit("stack");
    for (let i = 0; i < 3; i++) {
      cy.get(input).type(i).should('have.value', i)
      cy.get(button).click()

      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(210, 82, 225)')
        .parent()
        .should("contain", "top")
      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
 
    cy.get(buttonDelete).click();
    cy.get(circle).last().should("have.css", "border", '4px solid rgb(210, 82, 225)');
    cy.get(circle).should("have.length", 2);
    cy.get(circle).should("have.css", "border", '4px solid rgb(0, 50, 255)');
  });

  it("Правильная очистка стека", () => {
    cy.visit("stack");
    for (let i = 0; i < 3; i++) {
      cy.get(input).type(i).should('have.value', i)
      cy.get(button).click()

      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(210, 82, 225)')
        .parent()
        .should("contain", "top")
      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
 
    cy.get(buttonClear).click();
    cy.get(circle).should("have.length", 0);
    cy.get(circle).should("not.exist")
  });

})




