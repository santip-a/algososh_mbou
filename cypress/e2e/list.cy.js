describe("List page tests", () => {
  beforeEach(() => {
    cy.visit('/list')
    cy.contains('button', 'Добавить в head').as('addHead_btn');
    cy.contains('button', 'Добавить в tail').as('addTail_btn');
    cy.contains('button', 'Удалить из tail').as('deleteTail_btn');
    cy.contains('button', 'Удалить из head').as('deleteHead_btn');
    cy.contains('button', 'Добавить по индексу').as('addIndex_btn');
    cy.contains('button', 'Удалить по индексу').as('deleteIndex_btn');
    cy.get('input[placeholder="Введите значение"]').as('inputValue')
    cy.get('input[placeholder="Введите индекс"]').as('inputIndex')
  })

  it("если инпуте пуст, то кнопки добавления, добавления по индексу, удаления по индексу недоступны", () => {
    cy.get('@addTail_btn').should('be.disabled');
    cy.get('@addHead_btn').should('be.disabled');
    cy.get('@addIndex_btn').should('be.disabled');
    cy.get('@deleteIndex_btn').should('be.disabled');

    cy.get('@inputValue').type('111');
    cy.get('@addTail_btn').should('not.be.disabled');
    cy.get('@addHead_btn').should('not.be.disabled');

    cy.get('@inputIndex').type('0');
    cy.get('@addIndex_btn').should('not.be.disabled');
  })

  it("отрисовка дефолтного списка", () => {
    cy.get('div[class*="circle_circle"]').its("length").should("be.gte", 3).and("be.lte", 6);
    cy.get('div[class*="circle_circle"]').first().siblings('[class*="circle_head"]').should("have.text", "head");
    cy.get('div[class*="circle_circle"]').last().siblings('div[class*="circle_tail"]').should("have.text", "tail");
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el)
        .should("have.css", "border", "4px solid rgb(0, 50, 255)")
        .and("not.to.be.empty")
        .siblings('p[class*="circle_index"]')
        .should("have.text", index);
    });
  });

  it("Добавление элемента в head", () => {
    cy.clock();
    cy.get("@inputValue")
      .type('1')
      .should("have.value", '1');
    cy.get("@addHead_btn").should("be.visible").click();
    cy.get('div [class*=circle_small]')
      .first()
      .should("have.text", '1')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
    cy.tick(500);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.text", '1')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .siblings('[class*="circle_head"]')
      .should("have.text", "head")
      .siblings('div[class*="circle_tail"]')
      .should("not.have.text")
      .siblings('p[class*="circle_index"]')
      .should("have.text", 0);
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').eq(1).should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("Добавление элемента в tail", () => {
    cy.clock();
    cy.get("@inputValue")
      .type('2')
      .should("have.value", '2');
    cy.get("@addTail_btn").should("be.visible").click();
    cy.get('div [class*=circle_small]')
      .last()
      .should("have.text", '2')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.tick(500);
    cy.get('div [class*=circle_modified]');
    cy.get('div[class*="circle_circle"]')
      .last()
      .should("have.text", '2')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .siblings('[class*="circle_head"]')
      .should("not.have.text")
      .siblings('div[class*="circle_tail"]')
      .should("have.text", "tail");
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });


  it("Добавление элемента по индексу", () => {
    cy.clock()

    cy.get("@inputValue").should("be.empty").type('3')
    cy.get("@inputIndex").should("be.empty").type(2)
    cy.get("@addIndex_btn").should("not.be.disabled").click()

    cy.get('div[data-testid="circle"]')
      .as("circles")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.css", "border-color", "rgb(210, 82, 225)")
    cy.tick(1000)
    cy.tick(1000)
    cy.get("@circles")
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .and("have.text", '3')
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.css", "border-color", "rgb(0, 50, 255)")
  });

  it("Удаление элемента из head.", () => {
    cy.clock()
    cy.get("@deleteHead_btn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle"]').eq(0).should("have.text", "")
    cy.get("[class*=circle_small]").should("have.css", "border-color", "rgb(210, 82, 225)")
    cy.tick(1000)
    cy.get('div[data-testid="circle"]')
      .eq(0)
      .parent()
      .should("contain", "head")
  })

  it("Удаления элемента из tail", () => {
    cy.clock()
    cy.get("@deleteTail_btn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle"]').eq(3).should("have.text", "")
    cy.get("[class*=circle_small]").should("have.css", "border-color", "rgb(210, 82, 225)")
    cy.tick(1000)
    cy.get('div[data-testid="circle"]')
      .eq(2)
      .parent()
      .should("contain", "tail")
  })

  it("Удаления элемента по индексу", () => {
    cy.clock();
    cy.get("@inputValue")
      .type('111')
      .should("have.value", '111');
    cy.get("@addHead_btn").should("be.visible").click();
    cy.get('div [class*=circle_small]')
      .first()
      .should("have.text", '111')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
    cy.tick(500);

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.text", '111')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .siblings('[class*="circle_head"]')
      .should("have.text", "head")
      .siblings('div[class*="circle_tail"]')
      .should("not.have.text")
      .siblings('p[class*="circle_index"]')
      .should("have.text", 0);
    cy.tick(500);

    cy.get("@inputValue")
      .type('222')
      .should("have.value", '222');
    cy.get("@addHead_btn").should("be.visible").click();
    cy.get('div [class*=circle_small]')
      .first()
      .should("have.text", '222')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
    cy.tick(500);

    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.text", '222')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .siblings('[class*="circle_head"]')
      .should("have.text", "head")
      .siblings('div[class*="circle_tail"]')
      .should("not.have.text")
      .siblings('p[class*="circle_index"]')
      .should("have.text", 0);
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').eq(1).should("have.css", "border", "4px solid rgb(0, 50, 255)");


    cy.clock();
    cy.get("@inputIndex").type(1).should("have.value", 1);
    cy.get("@deleteIndex_btn").should("be.visible").click();
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').first().should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.tick(500);
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      if ([1, 1].includes(index)) {
        cy.wrap($el).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
    });
    cy.tick(500);
    cy.get('div [class*=circle_small]')
      .should("have.text", '111')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      if ([2].includes(index)) {
        cy.wrap($el).should("not.have.text");
      }
    });
    cy.tick(500);
    cy.get('div [class*=circle_small]').should("not.exist");
    cy.get('div[class*="circle_circle"]').each(($el, index) => {
      cy.wrap($el).should("not.to.be.empty");
    });
  })

})

