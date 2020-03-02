var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Strategy, ExtractJwt } = require('passport-jwt');
const Keys = require('../keys');
const Users = require('../shema/user');
const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Keys.JWT
};
module.exports = new Strategy(option, (payload, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const User = yield Users.findById(payload.id).select('id');
        if (User) {
            done(null, User);
        }
        else {
            done(null, false);
        }
    }
    catch (e) {
        console.log(e);
    }
}));
//# sourceMappingURL=passport-strategy.js.map