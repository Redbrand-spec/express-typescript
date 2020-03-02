const jwt = require('jsonwebtoken')
const Key = require('../keys')

const UserCategory = require('../shema/user')

interface Request {
  categories: {
    name: string,
    capacity: number,
    bill: number,
  },
  token: string
}

module.exports.category = async ( req: { body: Request }, res: any ) => {
  const token = req.body.token
  const decoded = jwt.verify(token , Key.JWT)

  await UserCategory.findById(decoded.id)
  .then( async (_request: any) => {
    const data = {
      name: req.body.categories.name,
      capacity: req.body.categories.capacity,
      value: req.body.categories. bill,
    }
    _request.categories.push(data)
    await _request.save()
    .then(() => {
      const UserData = {
        name: _request.name,
        categories: _request.categories,
      }
      res.status(200).json(UserData)
    })
    .catch(() => {
      res.status(400)
    })

  })
  .catch(() => {
    res.status(400)
  })




  res.status(200).json({message: '21312'})
}