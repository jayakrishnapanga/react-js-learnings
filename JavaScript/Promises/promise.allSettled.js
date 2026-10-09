


const p1=Promise.allSettled([1,2,3,Promise.reject("some error"),2345])
p1
.then(data=>console.log(`the state of promise object p1 ${p1} and result ${data}`))
.catch(err=>console.log(err))