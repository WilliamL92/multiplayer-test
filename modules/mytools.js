mytools = {
    randomInt: (max)=>{
        return Math.floor(Math.random() * Math.floor(max))
    },
    gestionUser: ()=>{
        let users = []
        let userLength = 0
        return {
            addUser: (id)=>{
                userLength ++
                let newUser = {
                    id,
                    name: `player${userLength}`,
                    pos: {x: Math.floor(Math.random() * Math.floor(500)), y: Math.floor(Math.random() * Math.floor(500))}
                }
                users.push(newUser)
                return newUser
            },
            getUser: (id = "")=>{
                let currentUser = ""
                for(let i = 0; i < users.length; i++){
                    if(users[i].id == id){
                        currentUser = users[i]
                    }
                }
                return currentUser
            },
            getAllUsers: ()=>{
                return users
            },
            removeUser: (id = "")=>{
                let result = false
                for(let i = 0; i < users.length; i++){
                    if(users[i].id == id){
                        users.splice(users.indexOf(users[i]), 1)
                        result = true
                    }
                }
                return result
            }
        }
    }
}

module.exports = mytools