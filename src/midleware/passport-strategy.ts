const { Strategy, ExtractJwt } = require('passport-jwt')
const Keys = require('../keys')

const Users = require('../shema/user')

const option  = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : Keys.JWT
}

module.exports = new Strategy( option, async (payload: { id: string }, done: (arg0: null, arg1: boolean) => void) => {
  try {
    const User = await Users.findById(payload.id).select('id')

    if ( User ) {
      done( null, User )
    } else {
      done( null, false )
    }

  } catch (e) {
    console.log(e)
  }
})