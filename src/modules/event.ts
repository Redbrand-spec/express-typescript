const jwtEv = require('jsonwebtoken')
const KeyEv = require('../keys')

const UserEv = require('../shema/user')

interface Events {
  type: string
  amount: number
  category: string
  token: string
}

module.exports.event = async (req: { body: Events }, res: any) => {
  const token = req.body.token
  const decoded = jwtEv.verify(token , KeyEv.JWT)
  await UserEv.findById(decoded.id)
  .then( async (_request: any) => {

    const Data = {
      type: req.body.type,
      amount: req.body.amount,
      date: Number(new Date().getTime())
    }

    const _id = req.body.category

    _request.categories.forEach((val: any) => {
      if (String(val._id) === _id ) {
        val.events.push(Data)
      }
    })

    await _request.save()
    .then(() => {
      res.status(200).json({_request})
    })
    .catch(() => {
      res.status(400).json({mes: 1})
    })

    res.status(400).json({mes: 1})
  })
  .catch(() => {
    res.status(400).json({mes: 1})
  })

}