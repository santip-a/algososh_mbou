import {circle, button, input, buttonDelete, buttonClear} from './constants';

describe("Тест страницы Очередь", function () {
  before(() => {
    cy.visit("queue");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get(input)
      .should("have.value", "")
      .then(() => {
        cy.get(button).should("be.disabled");
      });
  });


  it("Удаления элемента из очереди", () => {
    cy.visit("queue");
    for (let i = 0; i < 5; i++) {
      cy.get(input).should("be.empty").type(i)
      cy.get(button).should("not.be.disabled").click()

      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")

      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
  })

  it("Правильное удаление из очереди", () => {
    cy.visit("queue");

    for (let i = 0; i < 5; i++) {
      cy.get(input).should("be.empty").type(i)
      cy.get(button).should("not.be.disabled").click()

      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")

      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }

      cy.get(buttonDelete).click()
      cy.get(circle)
        .eq(0)
        .should("have.text", "")
        .and("have.css", "border-color", "rgb(0, 50, 255)")
      cy.get(circle)
        .eq(0)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .parent()
        .should("not.contain", "head")   
  });

  it("Правильная очистка очереди", () => {
    cy.visit("queue");
  
    for (let i = 0; i < 5; i++) {
      cy.get(input).should("be.empty").type(i)
      cy.get(button).should("not.be.disabled").click()
  
      cy.get(circle)
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")
  
      cy.get(circle).eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
  
    cy.get(buttonClear).should("not.be.disabled").click()
      cy.get(circle).each(($div) => {
        expect($div).to.have.text("")
      })
  })
})

