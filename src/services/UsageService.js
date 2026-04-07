class UsageService {
  constructor(creditService) {
    this.creditService = creditService;
    this.logs = [];
  }

  registerUsage(user, actionType, plan) {
    const costMap = {
      REPORT: 10,
      EXPORT: 25
    };

    const cost = costMap[actionType];

    if (!cost) throw new Error("Invalid action");

    this.creditService.consumeCredits(user, cost, plan);

    this.logs.push({
      userId: user.id,
      actionType
    });

    return { success: true };
  }
}

module.exports = UsageService;