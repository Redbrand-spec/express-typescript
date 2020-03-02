const jwtUser = require('jsonwebtoken')
const KeyUser = require('../keys')

const UserData = require('../shema/user')

module.exports.userdata = async (req: { body: { token: string } }, res: any) => {
  const token: string = req.body.token
  const decoded = jwtUser.verify(token , KeyUser.JWT)

  await UserData.findById(decoded.id)
  .then( (request: any) => {
    const UserData = {
      name: request.name,
      categories: request.categories,
    }
    res.status(200).json(UserData)
  })
  .catch(() => {
    res.status(400)
  })
}