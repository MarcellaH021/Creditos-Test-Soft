const PlanService = require("../../src/services/PlanService");

describe("PlanService", () => {
  test("deve resetar o crédito e desbloquear o usuário", () => {
    // Crie uma instância do serviço PlanService
    service = new PlanService()

    // Crie um usuário com:
    // credits negativo (ex: -50)
    // isBlocked como true
    user = {id: "u2", credits: -50, isBlocked: true};

    // Crie um plano com:
    // monthlyCredits definido (ex: 100)
    plan = { monthlyCredits: 100}

    // Execute o método applyMonthlyReset passando o usuário e o plano
    service.applyMonthlyReset(user, plan);

    // Verifique se os créditos do usuário foram resetados para o valor do plano
    expect(user.credits).toBe(100)

    // Verifique se o usuário foi desbloqueado (isBlocked = false)
    expect(user.isBlocked).toBe(false)
  });
});