class PlanService {
  applyMonthlyReset(user, plan) {
    user.credits = plan.monthlyCredits;
    user.isBlocked = false;
    return user;
  }
}

module.exports = PlanService;