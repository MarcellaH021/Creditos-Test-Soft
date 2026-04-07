const db = require("../database/fakeDB");

class UsageController {
  constructor({ usageService, planService, notificationService }) {
    this.usageService = usageService;
    this.planService = planService;
    this.notificationService = notificationService;
  }

  performAction(userId, actionType) {
    const user = db.users.get(userId);
    const plan = db.plans.get(user.planId);

    if (!user || !plan) {
      throw new Error("User or Plan not found");
    }

    const result = this.usageService.registerUsage(user, actionType, plan);

    this.notificationService.notifyLowCredits(user);

    return result;
  }

  monthlyReset(userId) {
    const user = db.users.get(userId);
    const plan = db.plans.get(user.planId);

    return this.planService.applyMonthlyReset(user, plan);
  }
}

module.exports = UsageController;