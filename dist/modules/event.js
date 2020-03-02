var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwtEv = require('jsonwebtoken');
const KeyEv = require('../keys');
const UserEv = require('../shema/user');
module.exports.event = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const token = req.body.token;
    const decoded = jwtEv.verify(token, KeyEv.JWT);
    yield UserEv.findById(decoded.id)
        .then((_request) => __awaiter(this, void 0, void 0, function* () {
        const Data = {
            type: req.body.type,
            amount: req.body.amount,
            date: Number(new Date().getTime())
        };
        const _id = req.body.category;
        _request.categories.forEach((val) => {
            if (String(val._id) === _id) {
                val.events.push(Data);
            }
        });
        yield _request.save()
            .then(() => {
            res.status(200).json({ _request });
        })
            .catch(() => {
            res.status(400).json({ mes: 1 });
        });
        res.status(400).json({ mes: 1 });
    }))
        .catch(() => {
        res.status(400).json({ mes: 1 });
    });
});
//# sourceMappingURL=event.js.map