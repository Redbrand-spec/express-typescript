const UserReg = require('../shema/user')
const BcriptReg = require('bcrypt')
const jwtReg = require('jsonwebtoken')

interface Login {
  email: string,
  pass: string,
  name: string
}


module.exports.register = async (req: { body: Login }, res: any) => {
  const Data: Login = req.body
  const status: boolean = await UserReg.findOne({ email: Data.email })

  if( !!status ===  false) {
    const salt: string = BcriptReg.genSaltSync(10)
    const Acc = new UserReg({
      email: Data.email,
      password: BcriptReg.hashSync( Data.pass , salt),
      name: Data.name
    })

    await Acc.save()
    .then(() => res.status(200).json({message: 'создан'}))
    .catch(() => res.status(402))

  } else {
    res.status(200).json({message: 'существует'})
  }


}