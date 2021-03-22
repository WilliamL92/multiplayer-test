function convertColor(color){
    return Phaser.Display.Color.HexStringToColor(color).color;
}

function keyDown(key = "", func = ()=>{}, uniq = false){
    bindKey = bindKey + 1
    let currentBindKey = bindKey
    let press = false
        $(document).bind(`keyup.${currentBindKey}up`, (u)=>{
            press = false
        })
    function listener(){
        $(document).unbind(`keydown.${currentBindKey}`)
        $(document).bind(`keydown.${currentBindKey}`, (e)=>{         
            if(uniq == false || press == false){
                if(key == "*"){
                    func({keycode: e.which, key: Object.keys(keyArr).find(key => keyArr[key] === e.which)})
                }
                else if(keyArr[key] == e.which){
                    
                    func({keycode: e.which, key: key})
                }
            }
            press = true
        })
    }
    if(key == "*"){
        listener()
    }
    else {
        for(const i in keyArr){
            if(i == key){
                listener()
            }
        }
    }
    return {
        stop: ()=>{
            $(document).unbind(`keydown.${currentBindKey}`)
        },
        start: ()=>{
            listener()
        },
        setKeyLock: (bool = false)=>{
            uniq = bool
            listener()
        }
    }
}

function keyUp(key = "", func = ()=>{}){
    bindKey = bindKey + 1
    let currentBindKey = bindKey
    function listener(){
        $(document).unbind(`keyup.${currentBindKey}`)
        $(document).bind(`keyup.${currentBindKey}`, (e)=>{
            if(key == "*"){
                func({keycode: e.which, key: Object.keys(keyArr).find(key => keyArr[key] === e.which)})
            }
            else if(keyArr[key] == e.which){
                func({keycode: e.which, key: key})
            }
        })
    }
    if(key == "*"){
        listener()
    }
    else {
        for(const i in keyArr){
            if(i == key){
                listener()
            }
        }
    }
    return {
        stop: ()=>{
            $(document).unbind(`keyup.${currentBindKey}`)
        },
        start: ()=>{
            listener()
        }
    }
}

function getTabUser(tab, id){
    let currentUser = {}
    for(let i = 0; i < tab.length; i++){
        if(tab[i].id == id){
            currentUser = tab[i]
        }
    }
    return currentUser
}

function gestionUser(){
    let users = []
    let userLength = 0
    let client = {}
    return {
        addUser: (user)=>{
            userLength ++
            users.push(user)
            return user
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
        },
        setMyInfo: (info)=>{
            client = info
        },
        getMyInfo: ()=>{
            return client
        }
    }
}