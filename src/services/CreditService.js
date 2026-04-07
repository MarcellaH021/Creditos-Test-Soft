class CreditService{
    consumeCredits(user, amount, plan){
        //Se user.isBlocked → lançar erro
        if(user.isBlocked)
            throw new Error("Usuário está bloqueado");
        //Se credits >= amount → consumir normalmente
        if(user.credits >= amount){
            user.credits = user.credits - amount;
            return user;
        }
        //Se credits < amount:
        if(user.credits < amount){
            //Se plano permite overage → deixar negativo até -100
            if(plan.overageAllowed){
                 user.credits = user.credits - amount;
                 if(user.credits <= -100)
                    user.isBlocked = true;
                 return user;
            }else
                throw new Error("Saldo insuficiente");     
        }   
    }
}
module.exports = CreditService;