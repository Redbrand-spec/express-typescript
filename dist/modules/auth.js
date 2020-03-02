var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UsersAuth = require('../shema/user');
const BcriptAuth = require('bcrypt');
const jwtAuth = require('jsonwebtoken');
const KeysAuth = require('../keys');
module.exports.auth = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const Data = req.body;
    const User = yield UsersAuth.findOne({ email: Data.email });
    if (User) {
        const Status = BcriptAuth.compareSync(Data.pass, User.password);
        if (Status) {
            const token = jwtAuth.sign({
                id: User._id
            }, KeysAuth.JWT, { expiresIn: 60 * 60 });
            res.status(200).json({ token });
        }
        else {
            res.status(404).json();
        }
    }
    else {
        res.status(404).json();
    }
});
//# sourceMappingURL=auth.js.map