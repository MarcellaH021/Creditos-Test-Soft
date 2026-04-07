class Plan{
    constructor({id, name, monthlyCredits, overageAllowed}){
        this.id = id;
        this.name = name;
        this.monthlyCredits = monthlyCredits;
        this.overageAllowed = overageAllowed;
    }
}
module.exports = Plan;