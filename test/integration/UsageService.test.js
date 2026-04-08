const UsageService = require("../../src/services/UsageService");

describe("UsageService", () => {
  let creditServiceMock;
  let service;
  let user;
  let plan;

  beforeEach(() => {
    // Crie um mock do CreditService com o método consumeCredits
    creditServiceMock = { consumeCredits: jest.fn() };

    // Crie uma instância do UsageService passando o mock
    service = new UsageService(creditServiceMock);

    // Crie um usuário simples com id (ex: "1")
    user = {id: 1}

    // Crie um plano vazio
    plan = {}
  });

  test("Deve chamar o serviço de crédito com custo de REPORT", () => {
    // Execute o método registerUsage com ação "REPORT"
    service.registerUsage(user, "REPORT", plan)
    // Verifique se consumeCredits foi chamado com:
    // user, custo 10, e plan
    expect(creditServiceMock.consumeCredits).toHaveBeenCalledWith(user, 10, plan)

  });

  test("Deve chamar o serviço de crédito com custo de EXPORT", () => {
    // Execute o método registerUsage com ação "EXPORT"
    service.registerUsage(user, "EXPORT", plan)
    // Verifique se consumeCredits foi chamado com:
    // user, custo 25, e plan
    expect(creditServiceMock.consumeCredits).toHaveBeenCalledWith(user, 25, plan)
  });

  test("Deve registrar o uso", () => {
    // Execute o método registerUsage com uma ação válida
    service.registerUsage(user, "EXPORT", plan)

    // Verifique se um log foi adicionado (tamanho da lista = 1)
    expect(service.logs.length).toBe(1);
  });

  test("Deve lançar erro para ação inválida", () => {
    // Execute o método registerUsage com uma ação inválida (ex: "INVALID")
    expect(() => service.registerUsage(user, "INVALID", plan)).toThrow("Invalid action")

    // Verifique se um erro é lançado com a mensagem "Invalid action"
  });
});