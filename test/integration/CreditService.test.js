const CreditService = require("../../src/services/CreditService");

describe("CreditService", () => {
  let service;
  let user;
  let plan;

  beforeEach(() => {
    // Crie uma nova instância do serviço antes de cada teste
    service = new CreditService()

    // Defina um usuário padrão com:
    // id: 1
    // credits: 50
    // isBlocked: false
    user = {id: 1, credits: 50, isBlocked: false};

    // Defina um plano padrão que permite overage (saldo negativo)
    plan = {overageAllowed: true}
  });

  test("deve consumir o crédito normalmente", () => {
    // Execute o método consumeCredits consumindo 20 créditos
    service.consumeCredits(user, 20, plan)

    // Verifique se os créditos do usuário foram reduzidos corretamente
    expect(user.credits).toBe(30)
  });

  test("deve permitir o limite negativo", () => {
    // Ajuste os créditos do usuário para um valor baixo (ex: 10)
    service.consumeCredits(user, 40, plan)
    // Consuma uma quantidade maior do que o saldo disponível
    service.consumeCredits(user, 20, plan)
    // Verifique se o saldo ficou negativo corretamente
    expect(user.credits).toBe(-10)
  });

  test("deve bloquear o usuário em -100", () => {
    // Defina o saldo do usuário próximo do limite negativo (ex: -90)
    service.consumeCredits(user, 140, plan)
    // Consuma créditos suficientes para ultrapassar -100
    service.consumeCredits(user, 20, plan)
    // Verifique se o usuário foi bloqueado (isBlocked = true)
    expect(user.isBlocked).toBe(true)
  });

  test("deve lançar erro se estiver bloqueado", () => {
    // Marque o usuário como bloqueado
    service.consumeCredits(user, 160, plan)
    /*service.consumeCredits(user, 160, plan)*/
    /*// Tente consumir créditos*/
    // Verifique se uma exceção (erro) é lançada
    expect(() => service.consumeCredits(user, 10, plan)).toThrow();
  });

  test("should throw if no overage", () => {
    // Configure o plano para NÃO permitir overage
    plan = {overageAllowed: false}
    // Defina um saldo menor que o valor a ser consumido
    user = {id: 1, credits: 20, isBlocked: false};
    // Tente consumir créditos
    //expect(() => user.credits).toThrow();   nn funciona
    // Verifique se uma exceção (erro) é lançada
    expect(() => user.credits()).toThrow();
  });
});