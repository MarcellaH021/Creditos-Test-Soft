const db = require("../../src/database/fakeDB");

const CreditService = require("../../src/services/CreditService");
const UsageService = require("../../src/services/UsageService");

beforeEach(() => {
  // Limpe os dados do banco fake antes de cada teste
  // (users e plans)
  db.users = [];
  db.plans = [];
});

describe("Integration - Overage Block", () => {
  test("deve bloquear o usuário quando atingir -100 créditos", () => {
    // Crie uma instância do CreditService
    let servicoCredito = new CreditService();
    let servicoUso = new UsageService(servicoCredito)

    let user = {
      id: "u1",
      credits: 5,
      isBlocked: false
    };
    
    let plan = {monthlyCredist:100, overageAllowed: true}
    while(user.isBlocked == false){
      servicoUso.registerUsage(user, "EXPORT", plan)
    }
    // Verifique se o usuário foi bloqueado
    expect(user.isBlocked).toBe(true)

    // Verifique se os créditos são menores ou iguais a -100
    expect(user.credits).toBeLessThanOrEqual(-100);
  });
});