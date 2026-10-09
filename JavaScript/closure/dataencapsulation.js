function createAccount(initialbalance){
    let balance=initialbalance;
    return{
        checkbalance:function(){
            console.log(`the current balance $${balance}`)
            return this.balance
        },
        withdraw:function(amount){
              if(amount>0&&amount<balance){
                this.balance-=amount;
                return `the avaibale balance $${balance}`
              }else{
                return `insufficient balance`
              }
        },
        deposit:function(amount){
            if(amount>0){
                this.balance+=amount;
            }
        }
    }
}

const myAccount=createAccount(1000)

console.log(myAccount.checkbalance())
// console.log(myAccount.withdraw(500))