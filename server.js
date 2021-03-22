const express = require('express')
require('dotenv').config()
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mytools = require('./modules/mytools')
const colors = require('colors')

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render(`${__dirname}/public/views/index`)
})

let gestUser = mytools.gestionUser()

io.on('connection', (socket) => {
  let newUser = gestUser.addUser(socket.id)
  console.log(`${newUser.name} connected`.cyan)
  socket.broadcast.emit('newUser', {newUser, users: gestUser.getAllUsers()})
  socket.emit('myUserData', {newUser, users: gestUser.getAllUsers()})

  socket.on('playerMovingRight', ()=>{
    socket.broadcast.emit('playerMovingRight', socket.id)
  })

  socket.on('playerMovingLeft', ()=>{
    socket.broadcast.emit('playerMovingLeft', socket.id)
  })

  socket.on('playerMovingUp', ()=>{
    socket.broadcast.emit('playerMovingUp', socket.id)
  })

  socket.on('playerMovingDown', ()=>{
    socket.broadcast.emit('playerMovingDown', socket.id)
  })

  socket.on('playerMovingRightKeyUp', ()=>{
    socket.broadcast.emit('playerMovingRightKeyUp', socket.id)
  })

  socket.on('playerMovingLeftKeyUp', ()=>{
    socket.broadcast.emit('playerMovingLeftKeyUp', socket.id)
  })

  socket.on('playerMovingUpKeyUp', ()=>{
    socket.broadcast.emit('playerMovingUpKeyUp', socket.id)
  })

  socket.on('playerMovingDownKeyUp', ()=>{
    socket.broadcast.emit('playerMovingDownKeyUp', socket.id)
  })

  socket.on('disconnect', () => {
    let userLeave = gestUser.getUser(socket.id)
    gestUser.removeUser(userLeave.id)
    socket.broadcast.emit('userLeave', userLeave)
    console.log(`${userLeave.name} disconnected`.magenta)
  })
})

http.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})