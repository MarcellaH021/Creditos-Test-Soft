const db = require("../../src/database/fakeDB");
const PlanService = require("../../src/services/PlanService");

beforeEach(() => {
  // Limpe os dados do banco fake antes de cada teste
  // (users e plans)
  db.users = [];
  db.plans = [];
});

describe("Integration - Monthly Reset", () => {
  test("deve resetar os créditos e desbloquear o usuário", () => {
    // Crie um usuário com:
    // id (ex: "u1")
    // créditos negativos (ex: -120)
    // usuário bloqueado (isBlocked: true)
    service = new PlanService()
    user = {id: "u1", credits: -120, isBlocked: true};

    // Crie um plano com:
    // quantidade de créditos mensais (ex: 100)
    plan = { monthlyCredits: 100}

    // Execute o método applyMnthlyReset passando o usuário e o plano
    service.applyMonthlyReset(user, plan);

    // Verifique se os créditos do usuário foram resetados para o valor do plano
    expect(user.credits).toBe(100)

    // Verifique se o usuário foi desbloqueado (isBlocked = false)
    expect(user.isBlocked).toBe(false)

  });
});