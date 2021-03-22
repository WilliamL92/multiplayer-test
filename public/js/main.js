$(window).on('load', ()=>{

  let socket = io()
  let gameWidth = $(window).width() * 0.8
  let gameHeight = $(window).height() * 0.8


  var config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    parent: 'gameStage',
    physics: {
        default: 'arcade',
    },
    scene: {
        preload,
        create,
        update
    }
}

  let game = new Phaser.Game(config)

  function preload (){
    
  }

  function create (){
    let players = []
    let _this = this
    let gestUser = gestionUser()
    let speed = 100

    //première connexion du client
    socket.emit('myUserData')
    socket.on('myUserData', (data)=>{
      gestUser.setMyInfo(data)

      for(let i = 0; i < data.users.length; i++){
        if(data.newUser.id != data.users[i].id){
          let player = _this.add.rectangle(data.users[i].pos.x, data.users[i].pos.y, 100, 100, convertColor('#088FDC'))
          _this.physics.add.existing(player)
          player.name = data.users[i].id
        }
      }

      let player = _this.add.rectangle(data.newUser.pos.x, data.newUser.pos.y, 100, 100, convertColor('#088FDC'))
      _this.physics.add.existing(player)
      player.name = data.newUser.id

      keyDown('right', ()=>{
        player.body.setVelocityX(speed)
        socket.emit('playerMovingRight')
      },true)

      keyUp('right', ()=>{
        player.body.setVelocityX(0)
        socket.emit('playerMovingRightKeyUp')
      })

      keyDown('left', ()=>{
        player.body.setVelocityX(-speed)
        socket.emit('playerMovingLeft')
      },true)

      keyUp('left', ()=>{
        player.body.setVelocityX(0)
        socket.emit('playerMovingLeftKeyUp')
      })

      keyDown('up', ()=>{
        player.body.setVelocityY(-speed)
        socket.emit('playerMovingUp')
      },true)

      keyUp('up', ()=>{
        player.body.setVelocityY(0)
        socket.emit('playerMovingUpKeyUp')
      })

      keyDown('down', ()=>{
        player.body.setVelocityY(speed)
        socket.emit('playerMovingDown')
      },true)

      keyUp('down', ()=>{
        player.body.setVelocityY(0)
        socket.emit('playerMovingDownKeyUp')
      })
    })
    socket.on('newUser', (data)=>{
      gestUser.addUser(data.newUser)
      let player = _this.add.rectangle(data.newUser.pos.x, data.newUser.pos.y, 100, 100, convertColor('#088FDC'))
      player.name = data.newUser.id
      _this.physics.add.existing(player)
    })

    socket.on('userLeave', (user)=>{
      gestUser.removeUser(user.id)
      let rectRef = _this.children.getByName(user.id)
      rectRef.destroy()
    })  
    
    socket.on('playerMovingRight', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityX(speed)
    })

    socket.on('playerMovingLeft', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityX(-speed)
    })

    socket.on('playerMovingUp', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityY(-speed)
    })

    socket.on('playerMovingDown', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityY(speed)
    })

    socket.on('playerMovingRightKeyUp', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityX(0)
    })

    socket.on('playerMovingLeftKeyUp', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityX(0)
    })

    socket.on('playerMovingUpKeyUp', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityY(0)
    })

    socket.on('playerMovingDownKeyUp', (id)=>{
      let rectRef = _this.children.getByName(id)
      rectRef.body.setVelocityY(0)
    })
    
  }

  function update(){
    
  }

})