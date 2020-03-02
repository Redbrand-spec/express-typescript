const App = require('./app')
const mongoose = require('mongoose')

const Port: number = 4000

mongoose.connect('mongodb+srv://qwerty:18364123Zz@fullstack-cejs7.gcp.mongodb.net/dock',
{ useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('база запущена'))
.catch((e: string) => console.log(e))

App.listen( Port , (err: string) => {
  if(err) throw err

  console.log(`сервер запущен на порте: ${Port}`)
})