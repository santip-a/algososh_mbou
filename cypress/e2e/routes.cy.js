describe('Проверки работы роутинга', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Главная страница', () => {
    cy.contains('АЛГОСОШ');
  })

  it('Переход на страницу - Рекурсия', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
  })

  it('Переход на страницу - Фибоначчи', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  })

  it('Переход на страницу - Сортировка массива', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  })

  it('Переход на страницу -  Стек', () => {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  })

  it('Переход на страницу -  Очередь', () => {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  })

  it('Переход на страницу - Связный список', () => {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный список');
  })

})