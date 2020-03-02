var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UserReg = require('../shema/user');
const BcriptReg = require('bcrypt');
const jwtReg = require('jsonwebtoken');
module.exports.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const Data = req.body;
    const status = yield UserReg.findOne({ email: Data.email });
    if (!!status === false) {
        const salt = BcriptReg.genSaltSync(10);
        const Acc = new UserReg({
            email: Data.email,
            password: BcriptReg.hashSync(Data.pass, salt),
            name: Data.name
        });
        yield Acc.save()
            .then(() => res.status(200).json({ message: 'создан' }))
            .catch(() => res.status(402));
    }
    else {
        res.status(200).json({ message: 'существует' });
    }
});
//# sourceMappingURL=register.js.map