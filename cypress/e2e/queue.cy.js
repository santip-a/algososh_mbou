describe("Тест страницы Очередь", function () {
  before(() => {
    cy.visit("queue");
    cy.get('[data-testid="input"]').as("input")
    cy.get('[data-testid="button"]').as("button")
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", function () {
    cy.get("@input")
      .should("have.value", "")
      .then(() => {
        cy.get("@button").should("be.disabled");
      });
  });


  it("Удаления элемента из очереди", () => {
    cy.visit("queue");
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="input"]').should("be.empty").type(i)
      cy.get('[data-testid="button"]').should("not.be.disabled").click()

      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")

      cy.get('div[class*="circle_circle"]').eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
  })

  it("Правильное удаление из очереди", () => {
    cy.visit("queue");

    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="input"]').should("be.empty").type(i)
      cy.get('[data-testid="button"]').should("not.be.disabled").click()

      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")

      cy.get('div[class*="circle_circle"]').eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }

      cy.get('[data-testid="buttonDelete"]').click()
      cy.get('div[data-testid="circle"]')
        .eq(0)
        .should("have.text", "")
        .and("have.css", "border-color", "rgb(0, 50, 255)")
      cy.get('div[data-testid="circle"]')
        .eq(0)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .parent()
        .should("not.contain", "head")   
  });

  it("Правильная очистка очереди", () => {
    cy.visit("queue");
  
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="input"]').should("be.empty").type(i)
      cy.get('[data-testid="button"]').should("not.be.disabled").click()
  
      cy.get('div[class*="circle_circle"]')
        .eq(i)
        .should("have.text", i)
        .and("have.css", "border-color", 'rgb(0, 50, 255)')
        .parent()
        .should("contain", "tail")
  
      cy.get('div[class*="circle_circle"]').eq(i).should("have.css", "border-color", 'rgb(0, 50, 255)')
    }
  
    cy.get('[data-testid="buttonClear"]').should("not.be.disabled").click()
      cy.get('div[data-testid="circle"]').each(($div) => {
        expect($div).to.have.text("")
      })
  })
})

