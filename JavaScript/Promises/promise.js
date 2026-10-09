const githubApi = "https://api.github.com/users/jkriktam";

const user=fetch(githubApi)

console.log(user)

user.then((data)=>{
    console.log(data)
})





