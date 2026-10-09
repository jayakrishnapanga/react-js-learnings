const obj={
    name: 'jkin object',
    getName: function(){
        let name="jkinside func"
        console.log(this)
        console.log(this.name)
    }
}
// obj.getName()
const jk=obj.getName
jk()