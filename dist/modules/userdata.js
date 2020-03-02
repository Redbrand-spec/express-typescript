var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwtUser = require('jsonwebtoken');
const KeyUser = require('../keys');
const UserData = require('../shema/user');
module.exports.userdata = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.body.token;
    const decoded = jwtUser.verify(token, KeyUser.JWT);
    yield UserData.findById(decoded.id)
        .then((request) => {
        const UserData = {
            name: request.name,
            categories: request.categories,
        };
        res.status(200).json(UserData);
    })
        .catch(() => {
        res.status(400);
    });
});
//# sourceMappingURL=userdata.js.map