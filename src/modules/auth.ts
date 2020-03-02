const UsersAuth = require('../shema/user')
const BcriptAuth = require('bcrypt')
const jwtAuth = require('jsonwebtoken')
const KeysAuth = require('../keys')

interface Login {
  email: string,
  pass: string
}
interface UserA {
  _id: string,
  email: string,
  password: string,
  name: string
}

module.exports.auth = async ( req: { body: Login }, res: any ) => {

  const Data: Login = req.body
  const User: UserA  = await UsersAuth.findOne({ email: Data.email })

  if( User ) {
    const Status:boolean = BcriptAuth.compareSync( Data.pass, User.password )
    if (Status) {
      const token = jwtAuth.sign({
        id: User._id
      }, KeysAuth.JWT , { expiresIn: 60 * 60 })
      res.status(200).json({token})
    } else {
      res.status(404).json()
    }
  } else {
    res.status(404).json()
  }
}